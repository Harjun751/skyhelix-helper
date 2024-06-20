import { usePrefStore } from "./stores/store";

export class Group {
    constructor(plus_size, normal, kids, nationality, id){
        this.plus_size = plus_size;
        this.normal = normal;
        this.kids = kids;
        this.nationality = nationality;
        this.id = id;
        this.size = plus_size + normal + kids;
    }
}

class Seat {
    constructor(number, next, occupied, long, hasPartition, hasPole, isShort){
        this.number = number;
        this.next = next;
        this.occupied = occupied;
        this.long = long;
        this.hasPartition = hasPartition;
        this.hasPole = hasPole;
        this.isShort = isShort;
        this.occupant = "";
        this.groupid = -1;
    }
}

export class Ride{
    constructor(number, state, liftoff, groups, seatplan){
        this.number = number;
        this.state = state;
        this.liftoff = liftoff;
        this.groups = groups;
        this.seatplan = seatplan;
    }
}

export class SuspensionStart{
    constructor(start){
        this.start = start;
    }
}
export class SuspensionEnd{
    constructor(end){
        this.end = end;
    }
}

// Gets the groups that will be going into the next ride
function get_groups(queue){
    let avail_seats = 16
    let next_groups = []
    for (let x = 0; x < queue.length; x++){
        let group_size = queue[x].size
        if (avail_seats - group_size >= 0){
            next_groups.push(queue[x])
            avail_seats -= group_size
        }
    }
    let average_gap = Math.floor(avail_seats/next_groups.length)
    next_groups.sort(function(a, b) {
        return b[0] - a[0]
    })
    // [groups, avail_gaps, avg_gaps]
    return [next_groups, avail_seats, average_gap]
}

const evenSets = [[1,2], [3,4], [5,6], [7,8], [9,10], [11,12], [13,14], [15,16]];
// Gets all possible variations of a group in a given seat set
function get_seat_variations(group, seats, reference){
    let start = seats[0];
    let end = start;
    let occupied_count = 0;
    let long_count = 0;
    let partitions_count = 0;
    let best_partitions_count = 0;
    let poles_count = 0;
    let short_count = 0;
    let update_group_same_count = 0;

    if (group.size <= 4){
        best_partitions_count = 0;
    } else if (group.size <= 8) {
        best_partitions_count = 1;
    } else if (group.size <= 12){
        best_partitions_count = 2;
    } else if (group.size <= 16){
        best_partitions_count = 3;
    }

    if (end.occupied){
        occupied_count+=1;
    }
    if (end.long){
        long_count+=1;
    }
    if (end.hasPole){
        poles_count+=1;
    }
    if (end.isShort){
        short_count+=1;
    }
    for (let i = 0; i < group.size - 1; i++){
        let res = step_crawler(end, group.id, reference);
        end = res.crawler;
        partitions_count += res.partition;
        long_count += res.end_longs;
        update_group_same_count += res.end_same_group;
        occupied_count += res.end_occupied;
        poles_count += res.end_poles;
        short_count += res.end_short;
    }
    let variations = [];
    while (start.number!=16){
        // get to an un-occupied slot
        while (occupied_count>0){
            // crawl forward by 1, maintaining all counters
            let resStart = step_crawler(start, group.id, reference);
            start = resStart.crawler;
            partitions_count -= resStart.partition;
            long_count -= resStart.start_longs;
            update_group_same_count -= resStart.start_same_group;
            occupied_count -= resStart.start_occupied;
            poles_count -= resStart.start_poles;
            short_count -= resStart.start_short;
            if (start.number==16){
                return variations;
            }
            let resEnd = step_crawler(end, group.id, reference);
            end = resEnd.crawler;
            partitions_count += resEnd.partition;
            long_count += resEnd.end_longs;
            update_group_same_count += resEnd.end_same_group;
            occupied_count += resEnd.end_occupied;
            poles_count += resEnd.end_poles;
            short_count += resEnd.end_short;
        }

        let new_seats = structuredClone(seats);
        for (let i = 0; i < 16; i++){
            let seat = new_seats[i];
            if (seat.groupid==group.id){
                seat.occupied = false;
                seat.occupant = '';
                seat.groupid = -1;
            }
        }
        let crawler = new_seats[start.number - 1];
        for (let i = 0; i < group.size; i++){
            crawler.occupied = true;
            crawler.groupid = group.id;
            crawler = crawler.next
        }
        // calculate group score for this variation
        let score = 16;
        if (long_count <= group.plus_size){
            // the more longer seatbelts the better - no bonus score for going over, though.
            score += long_count
        }

        // these penalties make the algo run very long in worse-case scenarios
        if (long_count > group.plus_size){
            // penalty for using more longer seatbelts than required
            score -= (long_count-group.plus_size)
        }
        if (poles_count>0){
            // penalize using the poled seats
            score -= poles_count * 0.5;
        }
        if (short_count>0){
            // penalize short seatbelts
            score -= short_count;
        }
        if (partitions_count<=best_partitions_count){
            // add score to partitions based on best partitions.. should be 1 all the time anyway...
            score += (best_partitions_count-partitions_count + 1);
        } else {
            // penalize partitions heavier if group size is lower
            score -= (16-group.size)
        }
        score += (update_group_same_count*100);
        if (group.size==2){
            let set = [start.number, end.number];
            if (evenSets.findIndex(x=> x[0]==set[0] && x[1]==set[1]) == -1){
                // penalize doubles not sitting at even set
                score -= 1;
            }
        }

        variations.push([new_seats, score]);
        if (start.number==16){
            break;
        }
        // crawl forward by 1, maintaining all counters
        let resStart = step_crawler(start, group.id, reference);
        start = resStart.crawler;
        partitions_count -= resStart.partition;
        long_count -= resStart.start_longs;
        update_group_same_count -= resStart.start_same_group;
        occupied_count -= resStart.start_occupied;
        poles_count -= resStart.start_poles;
        short_count -= resStart.start_short;
        
        let resEnd = step_crawler(end, group.id, reference);
        end = resEnd.crawler;
        partitions_count += resEnd.partition;
        long_count += resEnd.end_longs;
        update_group_same_count += resEnd.end_same_group;
        occupied_count += resEnd.end_occupied;
        poles_count += resEnd.end_poles;
        short_count += resEnd.end_short;
    }
    return variations;
}

// takes a step given a crawler, and updates according variables
function step_crawler(crawler, gid, reference){
    let start_long_count = 0;
    let start_poles_count = 0;
    let start_short_count = 0;
    let start_occupied_count = 0;
    let start_update_group_same_count = 0;

    let partition_points = 0;
    let long_count = 0;
    let poles_count = 0;
    let short_count = 0;
    let occupied_count = 0;
    let update_group_same_count = 0;

    let start_gid;
    if (reference!=null){
        let start_seat_reference = reference[crawler.number-1];
        start_gid = start_seat_reference.groupid;
    } else { 
        // our special UUID ;)
        start_gid = -123123;
    }

    if (start_gid == gid){
        start_update_group_same_count = 1;
    }
    if (crawler.hasPartition){
        partition_points = 1;
    }
    if (crawler.long){
        start_long_count = 1;
    }
    if (crawler.hasPole){
        start_poles_count = 1;
    }
    if (crawler.isShort){
        start_short_count = 1;
    }
    if (crawler.occupied){
        start_occupied_count = 1;
    }
    crawler = crawler.next;

    let end_gid;
    if (reference!=null){
        let end_seat_reference = reference[crawler.number-1];
        end_gid = end_seat_reference.groupid;
    } else { 
        // our special UUID
        end_gid = -123123;
    }

    if (end_gid == gid){
        update_group_same_count = 1;
    }
    if (crawler.long){
        long_count = 1;
    }
    if (crawler.hasPole){
        poles_count = 1;
    }
    if (crawler.isShort){
        short_count = 1;
    }
    if (crawler.occupied){
        occupied_count = 1;
    }
    return {
        "crawler":crawler,
        "partition": partition_points,
        "start_longs":start_long_count,
        "start_poles": start_poles_count,
        "start_short": start_short_count,
        "start_same_group": start_update_group_same_count,
        "start_occupied":start_occupied_count,
        "end_longs":long_count,
        "end_poles": poles_count,
        "end_short": short_count,
        "end_same_group": update_group_same_count,
        "end_occupied":occupied_count,
    }
}

// Creates the default configuration of seats
function getSeats(){
    const config = usePrefStore().seat_config;
    let seats = []
    let previous = null;
    for (let i = 1; i < 17; i++){

        let isLong = false;
        let isShort = false;
        if (config[i] == "Long"){
            isLong = true;
        } else if (config[i] == "Short"){
            isShort = true;
        }
        let hasPartition = false;
        if (i==4 || i==8 || i==12 || i == 16){
            hasPartition = true
        }
        let hasPole = false;
        if (i==5 || i == 16){
            hasPole = true;
        }
        let seat = new Seat(i, null, false, isLong, hasPartition, hasPole, isShort)
        if (previous!=null){
            previous.next = seat;
        }
        if (config[i] == "broken"){
            seat.groupid = -10;
            seat.occupied = true;
        }
        seats.push(seat)
        previous = seat;
    }
    seats[15].next = seats[0];
    return seats;
}

// Brute force function to get the next whole ride
function iterative_bruteforce(perfect_score, heap, old_ride){
    let best = 0;
    let best_seats = null;
    let i = 0;
    while (heap.size!=0){
        // get the highest score variation from the heap
        let next_best_var = heap.extractMax();
        let seats = next_best_var[0];
        let score = next_best_var[1];
        let rem_groups = next_best_var[2];
        if (rem_groups.length!=0){
            let next_group = rem_groups.pop();
            // calculate the next variations
            let next_vars = get_seat_variations(next_group, seats.slice(), old_ride);
            next_vars.map(x=> {x.push(rem_groups.slice()); x[1]=x[1]+score})
            // insert the variations into the heap
            next_vars.forEach(x => heap.insert(x));
        } else {
            // check termination criteria
            if (score == perfect_score){
                return seats;
            } else if (score > best){
                best_seats = seats;
                best = score;
            }
        }
        if (i==5000){
            // 5000 iterations should be more than enough to get the best seats
            // Due to the nature of the algo (using maxHeap), scores generally get lower and lower as time goes on
            // In worst-case scenarios where the perfect score cannot be met, the algo runs forever
            // in the worst-case of having 16 groups of 1, the permutations are twenty trillion. (16!)
            // So, early terminate after 5000 iterations yields solid results
            return best_seats;
        }
        i+=1;
    }
    return best_seats;
}

// Gets the best score for early termination
function calculate_best_case(groups){
    let perfect_score = 0;
    for (let x = 0; x < groups.length; x++){
        let group = groups[x];
        // score if full group is allocated
        let curr_score = 16;
        // add score if all plus size allocated
        curr_score += group.plus_size;
        // add score for partition bonus
        curr_score += 1;
        perfect_score+=curr_score;
    }
    return perfect_score;
}

// Public-facing function which handles everything to generate a new ride
// providing old_seats will make the algo prioritize keeping guests at their old seats
export function brute_force_seats(queue, old_seats){
    let seats = getSeats();
    let next_groups = get_groups(queue)[0];
    let groups = structuredClone(next_groups);
    let perfect_score = calculate_best_case(groups);
    let heap = new MaxHeap();
    heap.insert([seats, 0, next_groups]);
    let bestseats = iterative_bruteforce(perfect_score, heap, old_seats);
    allocate_seats(bestseats, groups)
    return [bestseats, groups];
}

// Allocation of seats within groups
function allocate_seats(seats, groups){
    groups = structuredClone(groups);
    let crawler = seats[0];
    let previous_gid = -20;
    let group = null;
    let previous_same_group_and_adult = false;
    for (let x = 0; x < 16; x++){
        if (!crawler.occupied){
            crawler = crawler.next;
            continue;
        } else if (crawler.groupid==-10){
            crawler.occupant = "X";
            continue;
        }
        // get group
        if (previous_gid != crawler.groupid){
            group = groups.find(x=> x.id == crawler.groupid);
            previous_gid = crawler.groupid;
            previous_same_group_and_adult = false;
        }
        if (crawler.long){
            if (group.plus_size > 0) { 
                crawler.occupant = "L";
                group.plus_size -= 1;
                previous_same_group_and_adult = true;
            } else {
                if (group.kids > 0  && previous_same_group_and_adult || (group.kids > 0 && group.plus_size==0 && group.normal == 0)){
                    crawler.occupant = "C"
                    group.kids -= 1;
                    previous_same_group_and_adult = false;
                } else {
                    crawler.occupant = "";
                    previous_same_group_and_adult = true;
                    group.normal -= 1;
                }
            }
        } else {
            if (group.kids > 0  && previous_same_group_and_adult || (group.kids > 0 && group.plus_size==0 && group.normal == 0)){
                crawler.occupant = "C"
                group.kids -= 1;
                previous_same_group_and_adult = false;
            } else if (group.normal > 0) {
                group.normal -=1;
                previous_same_group_and_adult = true;
            } else if (group.normal == 0 && group.kids == 0){
                crawler.occupant = "L"
                previous_same_group_and_adult = true;
            }
        }
        crawler = crawler.next;
    }
}


// max PQ funcs
const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 1;
const parent = (index) => Math.floor((index-1)/2);

class MaxHeap{
    constructor (){
        this.heap = [];
        this.size = 0;
    }
    swap = function (indexOne, indexTwo){
        const tmp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = tmp;
    }
    insert = function (element){
        this.heap.push(element);
        let index = this.heap.length - 1;
        while (index!=0 && this.heap[index][1] > this.heap[parent(index)][1]){
            this.swap(index, parent(index));
            index = parent(index);
        }
        this.size += 1;
    }
    
    extractMax = function () {
        const root = this.heap.shift();
        this.heap.unshift(this.heap[this.heap.length-1]);
        this.heap.pop();
        this.heapify(0);
        this.size-=1;
        return root;
    }
    
    heapify = function(index) {
        let left = leftChild(index);
        let right = rightChild(index);
        let smallest = index;
      
        // if the left child is bigger than the node we are looking at
        if (left < this.heap.length && this.heap[smallest][1] < this.heap[left][1]) {
          smallest = left;
        }
        
        // if the right child is bigger than the node we are looking at
        if (right < this.heap.length && this.heap[smallest][1] < this.heap[right][1]) {
          smallest = right;
        }
        
        // if the value of smallest has changed, then some swapping needs to be done
        // and this method needs to be called again with the swapped element
        if (smallest != index) {
          this.swap(smallest, index);
          this.heapify(smallest);
        }
      }

}