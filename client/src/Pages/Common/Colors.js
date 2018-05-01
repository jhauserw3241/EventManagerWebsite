export function generateColor() {
    var color = "";

            // Check if the color is not set
    while(  (color === "") ||
            // Check if the color is white
            (color.toLowerCase() === "#ffffff")) {
        color = "#" + ((1<<24) * Math.random() | 0).toString(16);
    }

    return color;
}