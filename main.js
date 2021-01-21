var checkId = 0;
var countText = ' item left';


$('#inputEdit').click(function () {
    $('.select').addClass('is-active');
});

$('#inputEdit').on('keypress', function (e) {

    if (e.which === 13 && $('#inputEdit').val() != '') {
        let flagRepet = false;
        for (let i = $('li').length - 1; i >= 0; i--) {
            if ($('#inputEdit').val() === $('#text__checkbox' + i).html())
                flagRepet = true;
        }
        if (flagRepet === true) {
            $('#inputEdit').val('');
        } else {
            $('div.select__icon').html('<img src="./icon.png">');

            $('lu').append($('lu'), `<li class="select__item">
            <div class="round">
            <input  type="checkbox" onclick = "chooseCheckBox(id)" id="checkbox` + checkId + `"/>
            <label  for="checkbox` + checkId + `"></label>
            </div>
            <div id = "text__checkbox` + checkId + `" class = "taskText"  >` + $('#inputEdit').val() + `</div>      
            <div id = "close` + checkId + `" class="close" onclick = "deleteStr(id)"></div>
            </li>`);

            $('div.wrap').html(`<div class="footer">
            <div id = "count" class = "counter"></div>                               
            <div class ="divButton" ><button id="all">All</button>
            <button id="active">Active</button>
            <button id="completed">Completed</button></div>
            <div id="clear" class="counter" onclick = "delCompleted()"></div>
            </div>
            <div class="backDiv1"></div>
            <div class="backDiv2"></div>`);

            $('#inputEdit').val('');
            countList();
            checkId++;
            $('#all').css('border', '1px solid #d19090');
        }


    }
});

function getCheckbox(i) {
    return $('li').eq(i).children().eq(0).children().eq(0)
}

function chooseCheckBox(id) {

    textCheckboxId = 'text__';
    textCheckboxId += id;
    if ($('#' + id).is(':checked') === true)
        $('#' + textCheckboxId).attr('class', 'taskTextChoesed');
    else
        $('#' + textCheckboxId).attr('class', 'taskText');
    let flagForClear = false;

    for (let i = $('li').length - 1; i >= 0; i--)
        if (getCheckbox(i).eq(0).is(':checked') === true)
            flagForClear = true;

    if (flagForClear === true)
        $('#clear').html('Clear completed');
    else
        $('#clear').html('');
    countList();
}

function countList() {
    let count = 0;

    for (let i = $('li').length - 1; i >= 0; i--)
        if ($('#checkbox' + i).is(':checked') === false && $('li').eq(i).css('display') != 'none')
            count++;

    if ($('#footerID').html() != '') {
        if (count === 1)
            countText = ' item left';
        else
            countText = ' items left';
        $('#count').html(count + countText);
    }
};

$('#icon').click(function () {
    let flagCheck = true;
    for (let i = $('li').length - 1; i >= 0; i--) {
        if (getCheckbox(i).is(':checked') != true) {
            flagCheck = false;
        }
    }
    if (flagCheck === true) {
        for (let i = $('li').length - 1; i >= 0; i--) {
            getCheckbox(i).prop('checked', false);
            $('li').eq(i).children().eq(1).attr('class', 'taskText');
            //$('li').eq(i).children().eq(1).toggleClass('taskTextChoesed');

        }
    } else {
        for (let i = $('li').length - 1; i >= 0; i--) {
            console.log('i click: ', i);
            getCheckbox(i).prop('checked', true);
            $('li').eq(i).children().eq(1).attr('class', 'taskTextChoesed')
            //$('li').eq(i).children().eq(1).toggleClass('taskTextChoesed');
        }
    }
    $('#clear').html('Clear completed');
    countList();
});

function deleteStr(id) {
    $('#' + id).parent().remove();
    if ($('#luID').html() === '') {
        $('#footerID').html('');
        $('#icon').html('');
        checkId = 0;
    }
    countList();
};

function delCompleted() {

    // $('li').forEach(element => {
    //     if (element.children().eq(0).children().eq(0).is(':checked') === true)            
    //         element.remove();
    // });
    console.log('/n');

    for (let i = $('li').length - 1; i >= 0; i--) {
        if (getCheckbox(i).is(':checked') === true) {
            $('li').eq(i).remove();
        }
    }
    let flagForClear = false;
    for (let i = $('li').length - 1; i >= 0; i--)

        if (getCheckbox(i).is(':checked') === true)
            flagForClear = true;

    if (flagForClear === true)
        $('#clear').html('Clear completed');
    else
        $('#clear').html('');


    if ($('#luID').html() === '') {
        $('#footerID').html('');
        $('#icon').html('');
        checkId = 0;
    }
};

$(document).on('click', '#active', function () {
    console.log('click active');
    for (let i = 0; i < $('li').length; i++) {
        let flag = $('#checkbox' + i).is(':checked');
        if (flag === true) {
            console.log(`('li')[i]: `, $('li')[i]);
            $('li').eq(i).css('display', 'none');
        } else {
            console.log(`('li')[i]: `, $('li')[i]);
            $('li').eq(i).css('display', 'flex');
        }

    }
    $('#all').css('border', 'none');
    $('#active').css('border', '1px solid #d19090');
    $('#completed').css('border', 'none');
});

$(document).on('click', '#all', function () {
    console.log('click all');
    for (let i = 0; i < $('li').length; i++) {
        $('li').eq(i).css('display', 'flex');
    }
    $('#all').css('border', '1px solid #d19090');
    $('#active').css('border', 'none');
    $('#completed').css('border', 'none');
});

$(document).on('click', '#completed', function () {
    console.log('click completed');
    for (let i = 0; i < $('li').length; i++) {
        let flag = $('#checkbox' + i).is(':checked')
        if (flag === false)
            $('li').eq(i).css('display', 'none');
        else
            $('li').eq(i).css('display', 'flex');
    }
    $('#all').css('border', 'none');
    $('#active').css('border', 'none');
    $('#completed').css('border', '1px solid #d19090');

});