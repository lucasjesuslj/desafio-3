$(document).ready(function(){

    const monthNames = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho","Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const categories = ["transporte", "compras", "saude", "servicos-auto", "restaurante", "supermercado"];
    const count_lancamentos_permonth = [['NAO'],['NAO'],['NAO'],['NAO'],['NAO'],['NAO'],['NAO'],['NAO'],['NAO'],['NAO'],['NAO'],['NAO']];

    function listAllLancamentos(){
        $.getJSON("http://localhost:8080/lancamentos",function(data) {
            for (var i = 0; i < data.length ; i++) {
                $('#list-geral').append('<tr>'+
                '<td>'+ data[i].id+'</td>'+
                '<td>'+ data[i].valor+'</td>'+
                '<td>'+ data[i].origem+'</td>'+
                '<td>'+ data[i].categoria+'</td>'+
                '<td>'+ monthNames[data[i].mes_lancamento-1]+'</td>'+
                '</tr>');
            }
        });
    
    }


    function listLancamentosMes(mes){
        $.getJSON("http://localhost:8080/lancamentosPorMes/"+mes,function(data) {    
            for (var i = 0; i < data.length ; i++) {
                
                    $('#list-mes').append('<tr class="mes-'+data[i].mes_lancamento+'">'+
                    '<td>'+ data[i].id+'</td>'+
                    '<td>'+ data[i].valor+'</td>'+
                    '<td>'+ data[i].origem+'</td>'+
                    '<td>'+ data[i].categoria+'</td>'+
                    '<td>'+ monthNames[data[i].mes_lancamento-1]+'</td>'+
                    '</tr>');
                 
            }
        });
    }

    function listLancamentosCategoria(cat){
        $.getJSON("http://localhost:8080/lancamentosPorCategoria/"+cat,function(data) {    
            for (var i = 0; i < data.length ; i++) {
          
                    $('#list-category').append('<tr class="category-'+data[i].categoria+'">'+
                    '<td>'+ data[i].id+'</td>'+
                    '<td>'+ data[i].valor+'</td>'+
                    '<td>'+ data[i].origem+'</td>'+
                    '<td>'+ data[i].categoria+'</td>'+
                    '<td>'+ monthNames[data[i].mes_lancamento-1]+'</td>'+
                    '</tr>');
 
            }
        });
    }

    function verifyMonths(){
        $.getJSON("http://localhost:8080/lancamentos",function(data) {
            for (var i = 0; i < data.length ; i++) {
                count_lancamentos_permonth[data[i].mes_lancamento-1][0]='SIM';
            }
            $.each(count_lancamentos_permonth, function( key, value ) {
                if(value =='NAO'){
                    $("#label-"+monthNames[key].toLowerCase()).attr('disabled','disabled');
                    $("#"+monthNames[key].toLowerCase()).attr('disabled','disabled');
                  
                    $("#label-"+monthNames[key].toLowerCase()).removeClass(' button-default')
                    $("#label-"+monthNames[key].toLowerCase()).addClass('buttonInactive')
                }  
            });
       });
    }

    $('input:checkbox.monsths').change(function(){
        if ($(this).is(':checked')) {
            listLancamentosMes($(this).data('target'));
            $("#label-"+monthNames[$(this).data('target')-1].toLowerCase()).addClass("buttonActive");
        }else{
            const removeElements = (elms) => elms.forEach(el => el.remove());
            removeElements( document.querySelectorAll(".mes-"+$(this).data('target')));       
            $("#label-"+monthNames[$(this).data('target')-1].toLowerCase()).removeClass("buttonActive");
        }
    });

    $('input:checkbox.category').change(function(){
        if ($(this).is(':checked')) {
            listLancamentosCategoria($(this).data('target'));
            $("#label-"+categories[$(this).data('target')-1].toLowerCase()).addClass("buttonActive");
        }else{
            const removeElements = (elms) => elms.forEach(el => el.remove());
            removeElements( document.querySelectorAll(".category-"+$(this).data('target')));       
            $("#label-"+categories[$(this).data('target')-1].toLowerCase()).removeClass("buttonActive");
        }
    });

    listAllLancamentos();
    verifyMonths();


});
