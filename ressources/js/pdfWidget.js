PDFJS.disableWorker = true;

var url = 'ressources/pdf/presentation.pdf';

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    canvas = document.getElementById('presentation'),
    ctx = canvas.getContext('2d');

function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport(parseInt($("#pdfWidget").css("width")) / page.getViewport(1.0).width);
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    var divPdf = parseInt($("#pdfWidget").css("height"));
    // var margin = ((parseInt($("#pdfWidget").css("height")) - canvas.height)/2) + "px";
    // $(canvas).css("margin-top", margin);

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function () {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }

    });
  });
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
 if (pageRendering)
   pageNumPending = num;
 else
   renderPage(num);
}

function onPrevPage() {
 pageNum--;
 if (pageNum < 1)
   pageNum = pdfDoc.numPages;
 queueRenderPage(pageNum);
}

function onNextPage() {
  pageNum++;
  if (pageNum > pdfDoc.numPages)
    pageNum = 1;
  queueRenderPage(pageNum);
}


// Asynchronously downloads PDF.
PDFJS.getDocument(url).then(function (pdfDoc_) {
  pdfDoc = pdfDoc_;
  // Initial/first page rendering
  renderPage(pageNum);
});
