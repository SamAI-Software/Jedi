/////////////////////////////////////
// ----- RETURN OF THE JEDI ------ //
// ------- Interactive CV -------- //
// Author: SamAI (@SamAI-Software) //
// http://samai-software.github.io //
// ------------ 2016 ------------- //

$(document).ready(function(){

  // ---SETTINGS --- //
  var user = {
    cover: "",
    name: "Your Name",
    salary: "Your Salary",
    salaryAfter: " lots of money",
    runScript: "",
    success: ""
  };

  var events = {
    typeIntroCover: false,
    typeIntroError: false,
    typeIntroName: false,
    typeIntroSalary: false,
    typeIntroFuncJedi: false,
    processing: false,
    success: false,
    showCV: false
  };

  // --- CACHE DOM --- //
  var $typeIn = {
    init: function() {
      this.cacheDom();
    },
    cacheDom: function() {
      this.el = $(".typeIn");
      this.introCover = this.el.find("#introCover");
      this.inputCover = this.el.find('#inputCover');
      this.introName = this.el.find("#introName");
      this.inputName = this.el.find('#inputName');
      this.introError = this.el.find("#introError");
      this.introSalary = this.el.find("#introSalary");
      this.inputSalary = this.el.find('#inputSalary');
      this.introFuncJedi = this.el.find("#introFuncJedi");
      this.inputFuncJedi = this.el.find('#inputFuncJedi');
      this.success = this.el.find("#success");
      this.inputSuccess = this.el.find('#inputSuccess');
    },
  };

  var $typeFrom = {
    init: function() {
      this.cacheDom();
    },
    cacheDom: function() {
      this.el = $('.typeFrom');
      this.introCover = this.el.find('#introCoverFrom');
      this.introError = this.el.find("#introErrorFrom");
      this.introName = this.el.find('#introNameFrom');
      this.introSalary = this.el.find('#introSalaryFrom');
      this.introFuncJedi = this.el.find('#introFuncJediFrom');
      this.success = this.el.find("#successFrom");
    },
  };

  var $CV = {
    init: function() {
      this.cacheDom();
    },
    cacheDom: function() {
      this.el = $('.CV');
      this.nav = this.el.find('nav');
      this.nav.a = this.nav.find('ul li a');
      this.bio = this.el.find('#bio');
      this.skills = this.el.find('#skills');
      this.projects = this.el.find('#projects');
      this.contacts = this.el.find('#contacts');
      this.side = this.el.find('#side');
      this.coding = this.el.find('#coding');
      this.UX = this.el.find('#UX');
      this.DS = this.el.find('#DS');
      this.PM = this.el.find('#PM');
    },
  };

  $typeIn.init();
  $typeFrom.init();
  $CV.init();

  // --- BIND EVENTS --- //
  $typeIn.inputCover.on("keydown", function(key){
    if (key.keyCode==13){
      var input = $(this).val();
      user.cover = input;
      $typeIn.inputCover.addClass("invisible");
      $typeIn.introCover.addClass("invisible");
      typeIntroError();
      }
    });

  $typeIn.inputName.on("keydown", function(key){
    if (key.keyCode==13){
      var input = $(this).val();
      user.name = input;
      console.log("user.name =" + user.name);
      $typeIn.inputName.addClass("invisible");
      $typeIn.introName.addClass("invisible");
      typeIntroSalary();
    }
  });

  $typeIn.inputSalary.on("keydown", function(key){
    if (key.keyCode==13){
      var input = $(this).val();
      user.salary = input;
      user.salaryAfter = (function(){
        var number = user.salary
                         .toString()
                         .split("")
                         .filter(function(l) {
                            return l.match(/\d+/);
                         }).join("")*1.5;
        return number>1000? number : " lots of cash";
      })();

      console.log("user.salary =" + user.salary);
      console.log("user.salaryAfter =" + user.salaryAfter);
      $typeIn.inputSalary.addClass("invisible");
      $typeIn.introSalary.addClass("invisible");
      typeIntroFuncJedi();
    }
  });
  
  $typeIn.inputFuncJedi.on("keydown", function(key){
    if (key.keyCode==13){
      var input = $(this).val();
      user.runScript = input;
      console.log("user.runScript =" + user.runScript);
      $typeIn.inputFuncJedi.addClass("invisible");
      $typeIn.introFuncJedi.addClass("invisible");
      processing();
    }
  });  
  
  $typeIn.inputSuccess.on("keydown", function(key){
    if (key.keyCode==13){
      var input = $(this).val();
      user.success = input;
      console.log("user.success =" + user.success);
      $typeIn.inputSuccess.addClass("invisible");
      $typeIn.success.addClass("invisible");
      showCV();
    }
  }); 
  
  $(window).click(function() {
    $('input').focus();
  });
  
  // -------- CV --------//
  
  $CV.nav.a.on('click', function() {
    $CV.bio.removeClass("invisible");
    $CV.skills.removeClass("invisible");
    $CV.projects.removeClass("invisible");
    $CV.contacts.removeClass("invisible");
  });
  
  $(document).on("scroll", onScroll);
  
  // ---------SCROLL--------- //  
  (function($) {
    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */
    $.fn.visible = function(partial) {

        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop(),
            viewBottom    = viewTop + $w.height(),
            _top          = $t.offset().top,
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

      return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

  })(jQuery);

  var win = $(window);

  var allMods = $("#coding, #DS, #PM, #side, #UX");
  
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      // console.log("already-visible");
    } 
  });

  win.scroll(function(event) {

    allMods.each(function(i, el) {
      var el = $(el);
      if (el.visible(true) && events.showCV) {
        // el.addClass("come-in"); 
        var ID = $(el).attr('id');
        barChart.draw(ID);
      } 
    });

  });
  // ---------SCROLL-END----- //
  
  // Draw bar charts on scroll//
  var barChart = {
    coding: false,
    DS: false,
    PM: false,
    side: false,
    UX: false,
    draw: function(ID) {
      if(!this[ID]){
        this[ID] = true;
        barCharts(ID, "H5", "", "");
      }
    }
  };

  // --- FIND ACTIVE TAB ----//
  function onScroll(event){
  var scrollPos = $(document).scrollTop();
  $('li>a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top -200 <= scrollPos && refElement.position().top -200 + refElement.height() > scrollPos) {
          $('li>a.active').removeClass("active");
          currLink.addClass("active");
      }
      else{
          currLink.removeClass("active");
      }
  });
  }
  
  // --- RENDER --- //
  function typeIntroCover() {
    $('input').val("");
    $typeIn.introCover.typed({
      stringsElement: $typeFrom.introCover,
      typeSpeed: 0
    });
    
    setIntervalSpecial(function(){
      $typeIn.inputCover.removeClass("invisible").focus();
    }, 6000);
  }
  
  function typeIntroError() {
    $typeIn.introError.typed({
      // strings: ["First ^2000 sentence.", "Second sentence."],
      stringsElement: $typeFrom.introError,
      typeSpeed: -100
    });
    setIntervalSpecial(function(){
      $typeIn.introError.addClass("invisible");
      typeIntroName();
    }, 2500);
  }
  
  function typeIntroName() {
    $typeIn.introName.typed({
      stringsElement: $typeFrom.introName,
      typeSpeed: 0,
      backSpeed: -25
    });
    setTimeout(function(){
      $typeIn.inputName.removeClass("invisible");
    }, 500);
    setIntervalSpecial(function(){
      $typeIn.inputName.addClass("redBorder").focus();
    }, 12500);
  }
  
  function typeIntroSalary() {
    $('#testName').text(user.name);
    $typeIn.introSalary.typed({
      // strings: ["First "+user.name+" ^2000 sentence.", "Second sentence."],
      stringsElement: $typeFrom.introSalary,
      typeSpeed: 0,
      backSpeed: -25
    });
    setTimeout(function(){
      $typeIn.inputSalary.removeClass("invisible");
    }, 500);
    setIntervalSpecial(function(){
      $typeIn.inputSalary.addClass("redBorder").focus();
    }, 11000);
  }
  
  function typeIntroFuncJedi() {
    console.log("function typeIntroFuncJedi");
    $typeIn.introFuncJedi.typed({
      // strings: ["First ^2000 sentence.", "Second sentence."],
      stringsElement: $typeFrom.introFuncJedi,
      typeSpeed: -20,
      backSpeed: -25
    });
    setTimeout(function(){
      $typeIn.inputFuncJedi.removeClass("invisible").focus();
    }, 500);
    setIntervalSpecial(function(){
      console.log("secondFocud - Red");
      $typeIn.inputFuncJedi.addClass("redBorder").focus();
    }, 34000);//sp0 = 58s //sp-5 = 55s //sp-20 = 38s
  }
   
  function processing() {
    console.log("function processing");
    // alert("processing");
    success();
  }
  
  function success() {
    console.log("function success");
    $typeIn.success.typed({
      stringsElement: $typeFrom.success,
      typeSpeed: 0,
      backSpeed: -25
    });
    setTimeout(function(){
      $typeIn.inputSuccess.removeClass("invisible").focus();
    }, 500);
    setIntervalSpecial(function(){
      $typeIn.inputSuccess.addClass("redBorder").focus();
    }, 10000);
  }

  function showCV() {
    console.log("function showCV");
    events.showCV = true;
    $('#userNameBioCV').text(user.name);
    $('#userSalaryBioCV').text(user.salaryAfter);
    setIntervalSpecial(function(){
      $('.functionJedi').addClass("invisible");
      $CV.el.removeClass("invisible");
      $CV.nav.removeClass("invisible");
    }, 600);
  }
  
  // --- SPECIAL --- //
  //http://stackoverflow.com/questions/5766263/run-settimeout-only-when-tab-is-active
  //run-settimeout-only-when-tab-is-active
  function setIntervalSpecial(func, time) {
    var time = time,
        delta = 100,
        tid;

    tid = setInterval(function() {
        if ( window.blurred ) { return; }    
        time -= delta;
        if ( time <= 0 ) {
            clearInterval(tid);
            func();
            // myFunction(); // time passed - do your work
        }
    }, delta);
  }

  window.onblur = function() { window.blurred = true; };
  window.onfocus = function() { window.blurred = false; };
  
  
  typeIntroCover();
  // typeIntroError();
  // typeIntroName();
  // typeIntroSalary();
  // typeIntroFuncJedi();
  // processing();
  // success();
  // showCV();
});

/////////////////////////////////////
// --------- BAR CHARTS ---------- //
// -------- (with D3.js) --------- //
// Author: SamAI (@SamAI-Software) //
// http://samai-software.github.io //
// ------------ 2016 ------------- //

var drawBarCharts = (function(data, place, totalWidth, leftMargin, rightMargin, topic, format, totalBars, xColumn, yColumn) {

  ///////////////////////////////
  // -------- FORMATS -------- //
  ///////////////////////////////
  var formats = {
      //  H4 - labels & titles outside the bar (for short bars)
      H4: {
        name: "H4",
        //bar value
        labels: {
          color: "black", // #006400 #008400 #7ED321
          position: {
            x: 5,
            y: 5,
            anchor: "" //"end" //"middle" //""
          }
        },
        //bar name
        titles: {
          color: "black",
          position: {
            x: -5,
            y: 5,
            anchor: "end" //"end" //"middle" //""
          }
        }
      },

      //  H4d - same as H4, but with decimal number (for very short bars)
      H4d: {
        name: "H4d",
        //bar value
        labels: {
          color: "black", // #006400 #008400 #7ED321
          position: {
            x: 5,
            y: 5,
            anchor: "" //"end" //"middle" //""
          },
          format: d3.format(".1%")
        },
        //bar name
        titles: {
          color: "black",
          position: {
            x: -5,
            y: 5,
            anchor: "end" //"end" //"middle" //""
          }
        }
      },

      //  H5 - labels & titles inside the bar (for long bars)
      H5: {
        name: "H5",
        // bar value
        labels: {
          color: "#ae81ff",
          position: {
            x: -5,
            y: 5,
            anchor: "end" //"end" //"middle" //""
          }
        },
        //bar name
        titles: {
          color: "#fd971f",
          position: {
            x: 5,
            y: 5,
            anchor: "" //"end" //"middle" //""
          }
        }
      }
    };   

  ////////////////////////////////////////
  // ------------ SETTINGS ------------ //
  ////////////////////////////////////////
  // -These are configurable variables -//
  // -------- GENERAL SETTINGS -------- //
  var format = formats[format];

  var bars = {
    total: totalBars + 1, // n + 1 blank bar //(5) = 6
    height: 25, // can be changed without problems
    padding: 5, // can be changed, but Y axis (left) might drift if displayed, so use it cautiously
    animation: {
      duration: 2000,
      delay: 50
    }
  };

  // -------- SPECIFIC SETTINGS ------- //
  var margin = {
      top: 20,
      right: rightMargin, // rightMargin is passed value
      bottom: 0,
      left: leftMargin // leftMargin is passed value
    },
    width = totalWidth - margin.left - margin.right, // totalWidth is passed value
    // width = "100%", //can't use "100%" because of left titles with const px size
    height = 20 - margin.top - margin.bottom + bars.total * (bars.height + bars.padding); //height generates automatically

  var yAxisLabel = ""; // CSS .y.axis { display: none }

  var formatPercent = format.labels.format? format.labels.format : d3.format(".0%");

  var y = d3.scale.ordinal()
    .rangeRoundBands([height + 0, 0]);

  var x = d3.scale.linear()
    .range([0, width]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .outerTickSize(0)
    .tickFormat(formatPercent);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  function render() {
    console.log("function render() called");

    var svg = d3.select(place).append("svg")
      .attr("width", "100%")
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", format.name)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(data, type, function(error, data) {
      console.log("d3.csv called");

      // Hide Y ticks labels if the value is 0 and Y axis is displayed
      yAxis.tickFormat(function(d) {
        var val = 0;
        data.forEach(function(item) {
          if (item[yColumn] == d) val = item[xColumn];
        });
        return val == 0 ? "" : d; // '=== 0' doesn't work, coz val might be not int
      });

      y.domain(data.map(function(d) {
        return d[yColumn];
      }).reverse());
      x.domain([0, 1]);      
      // x.domain([0, d3.max(data, function(d) {
      //   return d[xColumn];
      // })]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -5)
        .attr("y", -20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(yAxisLabel);

      svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 0)
        .attr("x", 0)
        // .attr("x", 800) // for fancy animation
        .transition().duration(bars.animation.duration)
        .delay(function(d, i) {
          return i * bars.animation.delay;
        })
        .attr("class", "bar")
        // .attr("x", 0) // for fancy animation
        .attr("width", function(d) {
          return ((x(d[xColumn])) / totalWidth) * 100 + "%";
        })
        .attr("y", function(d) {
          return (y(d[yColumn]) + bars.padding);
        })
        .attr("height", bars.height)
        .filter(function(d) {
          return d[xColumn] == 0; // '=== 0' doesn't work, coz xColumn not int
        }).remove();

      // Bar labels
      svg.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "barLabel")
        .style("fill", "white") // fill: white; is not a good approach coz bckgr can be not white //NEED FIX
        .transition()
        .duration(300)
        .delay(function(d, i) {
          return i * bars.animation.delay + bars.animation.duration - 400;
        })
        .text(function(d, i) {
          return formatPercent(d[xColumn]);
        })
        .attr('x', function(d) {
          return ((x(d[xColumn]) + format.labels.position.x) / totalWidth) * 100 + "%";
        })
        .attr('y', function(d) {
          return y(d[yColumn]) + bars.height / 2 + format.labels.position.y + bars.padding;
        })
        .style("fill", format.labels.color)
        .style("display", function(d) {
          if (!x(d[xColumn])) {
            return "none";
          }
        })
        .style("text-anchor", format.labels.position.anchor)
        .filter(function(d) {
          return d[xColumn] == 0; // '=== 0' doesn't work, coz xColumn not int
        }).remove();

      // Bar titles
      svg.selectAll(".text")
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'barTitle')
        .text(function(d) {
          return d[yColumn];
        })
        .attr('x', function(d) {
          return format.titles.position.x;
        })
        .attr('y', function(d) {
          return y(d[yColumn]) + bars.height / 2 + format.titles.position.y + bars.padding;
        })
        .style("fill", format.titles.color)
        .style("text-anchor", format.titles.position.anchor)
        .filter(function(d) {
          return d[xColumn] == 0; // '=== 0' doesn't work, coz xColumn not int
        }).remove();

    });

    function type(d) {
      // d.Age = +d.Age;
      return d;
    }
  }

  render();

  return {
    //API
  };

});

//  barCharts() prepares all variables to be passed into drawBarCharts()
var barCharts = (function(topic, format, leftMargin, rightMargin) {

  //data for bar charts
  var dataBC = './data/Jedi.csv';
  // var dataBC = 'https://raw.githubusercontent.com/SamAI-Software/projects/master/data/Jedi.csv';
  var xColumn = topic + "Perc"; // "Perc" is added because of special format of a current .csv file
  var yColumn = topic;

  //List of variables and amount of bars
  var listOfTopics = {
    coding: 3,
    DS: 3,
    PM: 3,
    side: 2,
    UX: 3,
  };

  var totalBars = listOfTopics[topic];

  ///////////////////////////////////////////////////////////
  // drawBarCharts(data, place, totalWidth,                //
  //               leftMargin, rightMargin, topic, format, //
  //               totalBars, xColumn, yColumn);           //
  ///////////////////////////////////////////////////////////

  //place - DOM container                   //e.g. "#JobPref"
  //totalWidth - width of a DOM container   //e.g. "500"
  //leftMargin - adjust left titles in H4   //e.g. "200"
  //rightMargin - adjust right labels in H4 //e.g. "40"
  //topic - column name in .csv file        //e.g. "JobPref"
  //format - "H4"/"H4d"/"H5"
  //https://files.gitter.im/SamAI-Software/UO6O/BarChartsHorizontal_H5H4.jpg

  drawBarCharts(dataBC, "#" + topic, $("#" + topic).width(), 
                leftMargin, rightMargin, topic, format, 
                totalBars, xColumn, yColumn);

});

//examples how to call barCharts()
// barCharts("JobPref", "H5", "", "");
// barCharts("IsSoftwareDev", "H5", "5", "5");
// barCharts("JobRoleInterest", "H4", "205", "50");