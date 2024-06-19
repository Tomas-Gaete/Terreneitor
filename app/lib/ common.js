function validateRut(rut) {
    // Despejar puntos y guion
    var valor = rut.replace(/\./g, '').replace('-', '');
    
    // Separar RUT y dígito verificador
    var cuerpo = valor.slice(0, -1);
    var digitoVerificador = valor.slice(-1).toUpperCase();

    // Validar que el RUT contiene solo números
    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }

    // Calcular dígito verificador
    const arrRut = cuerpo.split('').reverse();
    let sum = 0;
    let multiplo = 2;

    for (let i = 0; i < arrRut.length; i++) {
        sum += parseInt(arrRut[i]) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const digvCalculado = 11 - (sum % 11);
    let digv;

    if (digvCalculado === 11) {
        digv = '0';
    } else if (digvCalculado === 10) {
        digv = 'K';
    } else {
        digv = digvCalculado.toString();
    }

    // Comparar dígito verificador calculado con el ingresado
    return (digv === digitoVerificador) ? cuerpo+"-"+digv : false;
}