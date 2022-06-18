export function checkCollision(vec1, vec2List){
    let found = false;
    vec2List.forEach(vec2 => {
        if (checkSingleCollision(vec1, vec2)){
            found = true;
        }
    });
    return found;
}

export function checkSingleCollision(vec1, vec2){
    return vec1.x == vec2.x && vec1.y == vec2.y;
}