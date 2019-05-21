function selectAll(mark, sender) {
    var checked = (Boolean)($(sender).attr("checked"));
    $("input[type='checkbox'][mark='" + mark + "']").attr('checked', checked);
}

function undoCheck(mark, sender) {
    var checked = (Boolean)($(sender).attr("checked"));
    if (!checked) {
        $("input[id$='chkAll'][mark='" + mark + "']").attr('checked', false);
    }
    else {
        var defaultLeng = $("input[type='checkbox'][mark='" + mark + "']").length - 1;
        var checkedLength = $("input[type='checkbox'][mark='" + mark + "']:checked").length;
        var isChkAllChecked = (defaultLeng == checkedLength);
        if (isChkAllChecked) {
            $("input[id$='chkAll'][mark='" + mark + "']").attr('checked', true);
        }
    }
}

function getCheckedValueList(mark) {
    var idList = "";
    $("input[type='checkbox'][mark='" + mark + "']:checked").each(function() {
        var value = $(this).val();
        if (value != 0 && value != 'on' && value != 'off') {
            idList += value + ",";
        }
    });
    idList = idList.substr(0, idList.length - 1);

    return idList;
}

function fillHidden(hiddenMark) {
    $("input[mark='" + hiddenMark + "']").val(getCheckedValueList(hiddenMark));
}

function bulkOperat(alertMes, ConMes) {
    var checkedCount = $(".table-list01 input[type='checkbox']:checked").length;
    if (checkedCount == 0) {
        alert(alertMes);
        return false;
    } else {
        if (ConMes) {
            if (confirm(ConMes)) {
                $("input[mark='IdList']").val(getCheckedValueList());
                return true;
            } else {
                return false;
            }
        } else {
            $("input[mark='IdList']").val(getCheckedValueList());
            return true;
        }
    }
}