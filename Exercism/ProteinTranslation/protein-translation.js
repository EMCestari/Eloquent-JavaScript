//
// This is only a SKELETON file for the 'Protein Translation' exercise. It's been provided as a
// convenience to get you started writing code faster.
//


export const translate = (RNASequence) => {

  var codonSequence = [];
  var proteinTranslation = [];

  if(typeof(RNASequence) == "string"){
    for (var i=0; i<RNASequence.length; i+=3){
      codonSequence.push(RNASequence.substring(i, i+3));
    }
    
    for(var j=0; j<codonSequence.length; j++){
      var currentCodon = codonSequence[j];
      if (codonIsStop(currentCodon)){
        break;
      } else {
        proteinTranslation.push(translateCodon(codonSequence[j]));
      }
    }
  }

  return proteinTranslation;
}

function translateCodon(codon){
  var protein;

  if(codon == "AUG"){
    protein = "Methionine";
  } else if (codon == "UUU" || codon == "UUC"){
    protein = "Phenylalanine";
  } else if (codon == "UUA" || codon == "UUG"){
    protein = "Leucine";
  } else if (codon == "UCU" || codon == "UCC" || codon == "UCA" || codon == "UCG"){
    protein = "Serine";
  } else if (codon == "UAU" || codon == "UAC"){
    protein = "Tyrosine";
  } else if (codon == "UGU" || codon == "UGC"){
    protein = "Cysteine";
  }else if (codon == "UGG"){
    protein = "Tryptophan";
  } else {
    throw(new Error("Invalid codon"));
  }
  return protein;
}

function codonIsStop(codon){
  var isStop = false;
  if (codon == "UAA" || codon == "UAG" || codon == "UGA"){
    isStop = true;
  }
  return isStop;
}