img = "";
status = "";
objects = [];
sound = "";

function preload()
{
    sound = loadSound("music2.mp3");
}

function setup() 
{   
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Object "; 
}

function modalLoaded()
{
    console.log("ModalLoaded !");
    status = true;
    objectDetector.detect(video,gotResults);
    
}
function gotResults(error , results)
{
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video , 0 , 0 , 380 , 380);

    if (status != "")

    {   
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video , gotResults);
        for( i = 0 ; i < objects.length ; i++ )
        {
            document.getElementById("status").innerHTML = "Object Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" +percent+"%" , objects[i].x ,objects[i].y );
            noFill();
            stroke(r , g , b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height );
            if (objects[i].label == "person")
            {
        
                document.getElementById("status2").innerHTML = "Baby Found";
                sound.stop();
            }
            else 
            {
                document.getElementById("status2").innerHTML = "Baby Not Detected";
                sound.play();
                sound.setVolume(0.2);
            }
        }
        if(objects.length == 0)
        {
            document.getElementById("status2").innerHTML = "Baby Not Found";
            sound.play();
            sound.setVolume(0.2);

        }
    
    }
}

