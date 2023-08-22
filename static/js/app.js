$(document).on('click', '[data-itag]', function () {
    var itag = parseInt($(this).attr('data-itag'));
    $.ajax('/download', {
        method: 'post',
        data: {
            itag: itag,
            url: $('#url').val(),
        },
        success: function (data) {
            if (data.status != 'success') {
                alert(data.message);
                return;
            }
            window.location = data.data;
        },
    });
});

function details() {
    var url = $('#url').val();
    if (url.length == 0) {
        alert('URL cannot be empty');
        return;
    }
    $.ajax('/details', {
        method: 'post',
        data: {
            url: url,
        },
        success: function (data) {
            if (data.status != 'success') {
                alert(data.message);
                return;
            }
            renderLinks(data.data);
        },
    });
}

function renderLinks(links) {
    $('#links *').remove();
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        $(document.createElement('li'))
            .addClass('w3-bar')
            .append(
                $(document.createElement('span'))
                    .addClass('w3-bar-item w3-left')
                    .text(link.video ? link.resolution : link.bitrate)
            )
            .append(
                $(document.createElement('span'))
                    .addClass('w3-bar-item w3-right')
                    .append($(document.createElement('span')).addClass('w3-btn w3-blue fa fa-download w3-padding').attr({ 'data-itag': link.itag }))
            )
            .append($(document.createElement('span')).addClass('w3-bar-item w3-right w3-text-grey').text(link.filesize))
            .appendTo('#links');
    }
}
