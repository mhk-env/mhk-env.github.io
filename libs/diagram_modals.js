// append div for modal
function appendHtml(el, str) {
  var div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}

var modal_html = '<div aria-labelledby="modal-title" class="modal fade bs-example-modal-lg" id="modal" role="dialog" tabindex="-1"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="modal-title">title</h4></div><div class="modal-body"><iframe data-src="" height="100%" width="100%" frameborder="0"></iframe></div><div class="modal-footer"><button class="btn btn-default btn-sm" data-dismiss="modal">Close</button></div></div></div></div>';

appendHtml(document.body, modal_html);

function basename(path) {
     return path.replace(/.*\//, '');
}

// function to convert links in diagram to modal popups
function svg_links_to_modals() {
  
  // select svg
  var svg = d3.select('svg');
  console.log('svg select');
  
  // select clickable nodes within svg
  svg.selectAll('g.clickable')
    .each(function(d, i) { // iterate over each
      
      g   = d3.select(this).select('g g');
      a   = d3.select(this).select('g g a');
      url = a.attr('href');
      
      // replace inner html with content of a
      g.node().innerHTML = a.html();
      // TODO: get g attributes like transform to apply
      
      //g.enter()
      //a.attr('target') = '_blank';

      // get url
      
      console.log('href g.clickable g g a: ' + url);
      
      // setup click event
      function handleClick(){
        $('#modal').find('iframe').prop('src', url);
        
        $('#modal').on('show.bs.modal', function () {
          $('.modal-content').css('height',$( window ).height()*0.9);
          $('.modal-body').css('height','calc(100% - 65px - 55.33px)');
        });
        
        $('#modal').modal();
      }
      
      // attach click event to svg element
      d3.select(this).on("click", handleClick);
      
    });
}


function style_mmd(){
     var rect = ".node rect { fill:#99d1b3; stroke:#333; stroke-width:2px; }"
   var rect_hover = " .node rect:hover { fill:#75a189; }"
   // var rect_active = " .node rect:active { transform:translateY(2px); }"
   var rect_active = " .node rect:active { fill:#75a189; }"

   var label = ".clickable foreignObject { color:black; }"
   var label_hover = ".clickable foreignObject:hover { color:#5e6bb5; fill:#75a189; background:#5e6bb5}"

   var polygon = " .node polygon { fill:#96b0e0; stroke:#333; stroke-width:3px; }"


   var config = {
     startOnLoad:true,
     flowchart:{
       useMaxWidth:true,
       htmlLabels:true,
     },
     securityLevel:'loose',
     themeCSS: polygon + rect + rect_hover + rect_active + label // + label_hover
   };

   mermaid.initialize(config);
  
}

// update links to modals
//svg_links_to_modals();
// instead, run in R with: htmlwidgets::onRender(diagram, "svg_links_to_modals();")
