    var score = 0;
    var highScore = 0;
    d3.select(".scoreStyle").append('div').attr("class", "score").text("Current Score: " + score);
    d3.select(".scoreStyle").append('div').attr("class", "highScore").text("High Score: " + highScore);
    var scoreTimer = function() {
      setInterval(function() {
      score++;
      d3.select('.score')
      .text("Current Score: " + score);
      if (collision()) {
        if (score > highScore) {
          highScore = score;
          //alert("NEW HIGH SCORE! " + highScore);
        }
        score = 0;
        d3.select('.highScore').text("High Score: " + highScore);
      }
      }, 50);

    }();
    //var enemiesCount = prompt("How many nenemies you want bro?")
    var enemiesCount = function() {
      var difficulty = prompt("WAT MOAD? Enter (easy, medium, or hard!)");
      if (difficulty === "easy") {
        return 10;
      } else if (difficulty === "medium") {
        return 20;
      } else if (difficulty === "hard") {
        return 30;
      } else {
        return 20;
      }
    }();
    var width = 800;
    var height = 600;
    var svg = d3.select('svg');
    svg.attr('width', width).attr("height", height);

    var enemies = svg.selectAll("circle").data(d3.range(enemiesCount));

    var loop = function(){
      d3.select(this)
      .transition().ease('back-in').duration(1500)
      .attr("cx", function(d){ return Math.random() * width; })
      .attr("cy", function(d){ return Math.random() * height; })
      .each("end", loop);
    };

    enemies.enter().append("circle")
      .attr("cx", function(d){ return Math.random() * width; })
      .attr("cy", function(d){ return Math.random() * width; })
      .attr("r", function(d){ return 10; })
      .attr("fill", function(d){ return "url(#image)"; })
    .transition().duration(1500)
      .attr("cx", function(d){ return Math.random() * width; })
      .attr("cy", function(d){ return Math.random() * height; })
      .each("end", loop);

       var drag = d3.behavior.drag()
        .on("drag", function(d,i) {
            d.cx += d3.event.dx;
            d.cy += d3.event.dy;
            if(d.cx > width-10){
              d.cx = width-10;
            } else if(d.cx < 10){
              d.cx = 10;
            }
            if(d.cy > height-10){
              d.cy = height-10;
            } else if(d.cy < 10){
              d.cy = 10;
            }
            d3.select(this).attr("cx", d.cx).attr("cy", d.cy);
        });

      d3.select('svg').append('circle')
      .data([ {"cx":width/2, "cy":height/2} ])
      .attr('class', 'player')
      .attr("cx", width/2)
      .attr("cy", height/2)
      .attr("r", 10)
      .attr("fill", "url(#ninja)")
      .call(drag);

      var collision = function(){
        var playerX = d3.select(".player").attr("cx");
        var playerY = d3.select(".player").attr("cy");
        var enemiesX = [];
        var enemiesY = [];
        enemies.each( function(){
          enemiesX.push(d3.select(this).attr("cx"));
        });
        enemies.each( function(){
          enemiesY.push(d3.select(this).attr("cy"));
        });
        for (var i = 0; i < enemiesY.length; i++) {
          if ((playerX) > (enemiesX[i] - 10) && (playerY) > (enemiesY[i] - 10) && (playerX) < (enemiesX[i] + 10) && (playerY) < (enemiesY[i] + 10)) {
            return true;
          }
        }
       return false;
      }