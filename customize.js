function UpdatePrefrences()
{
    BACKGROUND_COLOR = document.getElementById("bg").value;
    BIRD_COLOR = document.getElementById("bird").value;
    OBSTACLE_COLOR = document.getElementById("obstacle").value;

    GRAVITY = parseFloat(document.getElementById("grav").value);
    FLAP_FORCE = -parseFloat(document.getElementById("flap").value);
    OBSTACLE_SPEED = parseFloat(document.getElementById("speed").value);
    BIRD_RADIUS = parseFloat(document.getElementById("size").value);

    OBSTACLE_WIDTH = parseFloat(document.getElementById("width").value);
    OBSTACLE_GAP_SIZE = parseFloat(document.getElementById("gap").value);
}

setInterval(UpdatePrefrences, 50);