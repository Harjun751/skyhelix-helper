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





export class Group {
    constructor(plus_size, normal, kids, id){
        this.plus_size = plus_size;
        this.normal = normal;
        this.kids = kids;
        this.id = id;
        this.size = plus_size + normal + kids;
    }
}

class Seat {
    constructor(number, next, occupied, long, hasPartition){
        this.number = number;
        this.next = next;
        this.occupied = occupied;
        this.long = long;
        this.hasPartition = hasPartition;
        this.occupant = "";
        this.groupid = -1;
    }
}

function get_seat_variations(group, seats){
    let start = seats[0];
    let end = start;
    let occupied_count = 0;
    let long_count = 0;
    let partitions_count = 0;
    let best_partitions_count = 0;
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
    for (let i = 0; i < group.size - 1; i++){
        if (end.hasPartition){
            partitions_count+=1;
        }
        end = end.next;
        if (end.long){
            long_count+=1;
        }
        if (end.occupied){
            occupied_count+=1;
        }
    }
    let variations = [];
    while (start.number!=16){
        // get to an un-occupied slot
        while (occupied_count>0){
            // crawl forward by 1, maintaining all counters
            if (start.occupied){
                occupied_count-=1;
            }
            if (start.hasPartition){
                partitions_count-=1;
            }
            if (start.long){
                long_count-=1;
            }
            if (start.number==16){
                return variations;
            }
            start = start.next;
            if (end.hasPartition){
                partitions_count+=1;
            }
            end = end.next;
            if (end.long){
                long_count+=1;
            }
            if (end.occupied){
                occupied_count+=1;
            }
        }

        // copy seats and create a set where this unoccupied slot is occupied
        let new_seats = structuredClone(seats);
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
        if (long_count > group.plus_size){
            // penalty for using more longer seatbelts than required
            score -= (long_count-group.plus_size)
        }
        if (partitions_count<=best_partitions_count){
            // add score to partitions based on best partitions.. should be 1 all the time anyway...
            score += (best_partitions_count-partitions_count + 1);
        }

        variations.push([new_seats, score]);
        if (start.number==16){
            break;
        }

        // crawl forward by 1
        if (start.occupied){
            occupied_count-=1;
        }
        if (start.hasPartition){
            partitions_count-=1;
        }
        if (start.long){
            long_count-=1;
        }
        start = start.next;
        if (end.hasPartition){
            partitions_count+=1;
        }
        end = end.next;
        if (end.long){
            long_count+=1;
        }
        if (end.occupied){
            occupied_count+=1;
        }
    }
    return variations;
}

function getSeats(){
    let seats = []
    let previous = null;
    for (let i = 1; i < 17; i++){
        let isLong = false;
        if (i==5 || i==6 || i==10 || i == 15){
            isLong = true
        }
        let hasPartition = false;
        if (i==4 || i==8 || i==12 || i == 16){
            hasPartition = true
        }
        let seat = new Seat(i, null, false, isLong, hasPartition)
        if (previous!=null){
            previous.next = seat;
        }
        seats.push(seat)
        previous = seat;
    }
    seats[15].next = seats[0];
    return seats;
}
function brute_force(queue, variation, score){
    if (queue.length == 0){
        // base case
        return [score, variation];
    } else {
        // recursive case
        // get the next group and pop the queue
        let group = queue[0];
        queue.shift();
        // set best score & variation
        let best_score = score;
        let best_variation = null;

        // get all possible placements of this group
        let possibilities = get_seat_variations(group, variation);
        for (let x = 0; x < possibilities.length; x++){
            let variation = possibilities[x][0];
            let var_score = possibilities[x][1];
            // Recurse. Call brute force with each possible variation
            let results = brute_force(queue.slice(), variation, (score + var_score));
            // results will be the best variation of all sub-possiblities

            // Compare results with current best score
            let new_score = results[0];
            // accept variation if it's better
            if (new_score > best_score){
                best_score = new_score;
                best_variation = results[1];
            }
        }
        return [best_score, best_variation];
    }
}

export function brute_force_seats(queue){
    let seats = getSeats();
    let next_groups = get_groups(queue)[0];
    let bruh = structuredClone(next_groups);
    let bestseats = brute_force(next_groups, seats, 0);
    bestseats = bestseats[1]
    allocate_seats(bestseats, bruh)
    return [bestseats, bruh];
}

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
                    crawler.occupant = "K"
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
                crawler.occupant = "K"
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