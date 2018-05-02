export function itemInList(item, list) {
    for(var index in list) {
        var element = list[index];
        if(item === element) {
            return true;
        }
    }
    return false;
}