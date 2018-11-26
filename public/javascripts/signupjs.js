$(function () {
    $(".delrec").click(function () {
        var id = $(this).attr("id");
        $.ajax({
            url:'/deleterecord',
            type:"delete",
            data:{'id':id},
            success: function(data){
                // console.log(data);
                location.reload(true);
            }
        });
    });

});

function ajaxFileUpload(){
    var path = $("#file").val();
    // console.log(path);
    if(!checkphoto(path)){
        $('#err').text('not photo');
        return false;
    }

    var formData = new FormData();
    var img_file = document.getElementById("file");
    var fileObj = img_file.files[0];
    formData.append('file',fileObj);
    formData.append('description',"hhhhh");
    $.ajax({
        url: '/signup/photo',
        data: formData,
        type : 'post',
        contentType: false,
        processData : false,
        success: function(data){
            $('#img').attr("src",data);
            $("#img").show();
            $('#purl').attr("value",data);
        },
    });
    return true;
}

function checkphoto(path) {
    var photoname;
    if(path.indexOf("\\")>0){
        photoname=path.substring(path.lastIndexOf("\\")+1,path.length);
    }else{photoname=path;}
    var i = photoname.lastIndexOf('.');
    var suffix = photoname.substring(i,photoname.length).toUpperCase();
    if(suffix!='.PNG'&&suffix!='.GIF'&&suffix!='.JPG'&&suffix!='.JPEG'&&suffix!='.BMP'){
        return false;
    }
    return true;
}