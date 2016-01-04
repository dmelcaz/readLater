// Obtenemos el contenido de la página para el formulario

function setPageDetails()  {

    chrome.tabs.getSelected(null, function(tab) {
      document.getElementById('title').value = tab.title,
      document.getElementById('url').value = tab.url;
    });
    //document.getElementById('description').value = window.getSelection().toString();
}

var statusDisplay = null;

// POST para subir los datos
function addBookmark() {

    event.preventDefault();

    // URL del servidor
    var postUrl = "http://readlater.dmelcaz.com/links";

    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, true);

    // Generamos la query
    var title = document.getElementById('title').value;
    var url = document.getElementById('url').value;
    var tag_list = document.getElementById('tag_list').value;
    // var description = document.getElementById('description').value;

    var params = '{"link":{"name":"'+ title + '","url":"' + url + '","tag_list":"' + tag_list + '","description":"", "read": false}}';

    // Cabecera en JSON
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Cambios en el estado de la petición
    xhr.onreadystatechange = function() {
        // Cuando se complete la petición
        if (xhr.readyState == 4) {
            statusDisplay.innerHTML = '';

            // Si es exitosa
            if (xhr.status == 200) {
                statusDisplay.innerHTML = 'Saved!';
                window.setTimeout(window.close, 500);

            // En el caso de no estar loggeado
            } else if (xhr.status == 403) {
                statusDisplay.innerHTML = 'Error saving: please <a href="http://readlater.dmelcaz.com">sign in</<a>';
            }

            // Si va mal
            else {
                statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
            }
        }
    };

    // Envio la peticón
    xhr.send(params);
    statusDisplay.innerHTML = 'Saving...';
}

// Cuando se carga el popup
window.addEventListener('load', function(evt) {

    // Elemento donde mostraremos los cambios de estado
    statusDisplay = document.getElementById('status-display');

    // Manejo de la petición de guardado
    document.getElementById('addReadLater').addEventListener('submit', addBookmark);

    // Obtención de los datos de la página
    setPageDetails();
});
