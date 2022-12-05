function registraEventos() {
  var agenda = CalendarApp.getCalendarById("idAgenda@group.calendar.google.com");
  var celula = SpreadsheetApp.getActiveSpreadsheet().getActiveCell();
  
  var horarioEvento = 10;
  var motorista =  celula.offset(0, -11).getValue(); //Nome do motorista
  var destino = celula.offset(0, -10).getValue(); //Destino final da viagem
  var valorReceber = parseFloat(celula.offset(0, -5).getValue()).toFixed(2).replace(".", ","); //Valor a receber por viagem
  var valorDesconto = parseFloat(celula.offset(0, -4).getValue()).toFixed(2).replace(".", ","); //Valor a receber por viagem
  var valorPagar = parseFloat(celula.offset(0, -3).getValue()).toFixed(2).replace(".", ","); //Valor a pagar por viagem (Descontado o percentual quando for agregado)
  var prevRecebimento = celula.offset(0, -1).getValue(); //Data prevista do recebimento do valor (A ser pago pelo cliente)
  var cor = "7";
  var descricao = "REGISTRO DE VIAGEM\n  Motorista: " + motorista + "\n  Destino: " + destino + ". \n  Valor total: R$ " + valorReceber + "\n  Desconto(13%): R$ " + valorDesconto + "\n  Valor a ser pago: R$ " + valorPagar//Descrição do agendamento

  prevRecebimento.setHours(prevRecebimento.getHours()+horarioEvento)
  
  if(celula.getRow() >= 2.0 && celula.getColumn() == 12.0) { //Verifica se a célula selecionada é de uma linha maior que 2 e coluna igual a 11
    if(celula.getValue() == true) { //Verifica se a célula foi preenchida
      if(motorista != "Valdete") {
        cor = "6";
      }
      var idEvento = agenda.createEvent(motorista + ' - R$ ' + valorPagar, prevRecebimento, prevRecebimento, {description: descricao});
      idEvento.setColor(cor);
      celula.offset(0, 2).setValue(idEvento.getId());
    } else {
      agenda.getEventById(celula.offset(0, 2).getValue()).deleteEvent(); //Verifica se a célula foi esvaziada
      celula.offset(0, 2).setValue("");//Registra o evento como desmarcado na planilha
    }
  }
}
/*
CORES DOS EVENTOS
11 Vermelho
10 Verde escuro
9 Lilás escuro
8 Cinza
7 Azul
6 Laranja
5 Amarelo
4 Salmão
3 Roxo
2 Verde
1 Lilás
*/
