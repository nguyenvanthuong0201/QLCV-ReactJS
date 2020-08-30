$(document).ready(function () {
    $(window).scroll(function () { 
        var vitri=$("body,html").scrollTop();
        // console.log(vitri);
        if(vitri >= 100)
        {
            $(".navbar").addClass("menu-background");
            $(".navbar").removeClass("bg-light");
        }
        else 
        {
            $(".navbar").removeClass("menu-background");
            $(".navbar").addClass("bg-light");

        }
    });
    $('.toTop').click(function(event) {
        console.log("đã click rồi nè")
        $('html,body').animate({scrollTop: 0},1400);
     });
     $('.btnXemChiTiet').click(function(){
         console.log("đã hoạt động")
        $("html,body").animate({ scrollTop:1050},500);
    });

     
});