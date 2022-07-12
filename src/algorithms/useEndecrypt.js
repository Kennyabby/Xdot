
export const useEndecrypt = (props,key,data)=>{
  const keyList = key.split("");
  const keyNum = keyList.map((element)=>{
      return(Number(element));
  });
  const dataList = data.split("");
  
  var dataNum = dataList.map((elem)=>{
      return(elem.codePointAt(0));
  })
  if (dataNum.length%2!==0){
      dataNum = dataNum.concat([32])
  }

  const keyMatrix = matrixSplit(keyNum,2);
  const dataMatrix = matrixSplit(dataNum,2);
  if (props==="encrypt"){
      const multKeyData = multiplyMatrices(dataMatrix,keyMatrix);
      const multKeyDataList = reverseSplit(multKeyData);
      var encryptedData = "";
      multKeyDataList.map((elem)=>{
          encryptedData+=String.fromCharCode(elem);
      })
      
      return encryptedData;
  }
  if (props==="decrypt"){
      const keyInverse = invertMatrix(keyMatrix);
      const multKeyData = multiplyMatrices(dataMatrix,keyInverse);
      const multKeyDataList = reverseSplit(multKeyData);
      var decryptedData = "";
      multKeyDataList.map((elem)=>{
          decryptedData+=String.fromCharCode(elem);
      })
      
      return decryptedData;
  }
}

const matrixSplit = (list,column)=>{
  var List = [];
  for (var i=0; i<list.length/2; i++){
      List = List.concat([[]]);
  }
  var count=0;
  for (var i=0; i<(list.length)/2; i++){
      for (var j=0; j<column; j++){

          List[i][j]=list[count];
          count++;
      }
  }
  return List;
}
const reverseSplit = (matrix)=>{
  var List=[];
  var count=0;
  const row= matrix.length;
  const column = matrix[0].length;
  for (var i=0; i<row; i++){
      for (var j=0; j<column; j++){
          List[count]=matrix[i][j];
          count++;
      }
  }
  return List;
}
const transposeMatrix = (matrix)=>{
  
  var List = [];
  for (var i=0; i<matrix[0].length; i++){
      List = List.concat([[]]);
  }
  const row= matrix.length;
  const column = matrix[0].length;
  for (var i=0; i<column; i++){
      for (var j=0; j<row; j++){
          List[i][j] = matrix[j][i]
      }
  }

  return List;

}
const multiplyMatrices = (matrix1,matrix2)=>{
  var List = [];
  for (var i=0; i<matrix1.length; i++){
      List = List.concat([[]]);
  }

  for (var i=0; i<matrix1.length; i++){
      
      for (var j=0; j<matrix2[0].length; j++){
          var mt1 = matrix1[i][0]*matrix2[0][j];
          var mt2 = matrix1[i][1]*matrix2[1][j];
          List[i][j]=mt1+mt2;
      }
  }
  return List;
}
const detMatrix = (matrix)=>{
  var det = 0;
  det+= (matrix[0][0]*matrix[1][1])-(matrix[0][1]*matrix[1][0])
  return det;
}
const compositeMatrix = (matrix)=>{
  var comp = [];
  for (var i=0; i<matrix.length; i++){
      comp = comp.concat([[]]);
  }
  comp[0][0] = matrix[1][1];
  comp[0][1] = -1*matrix[1][0];
  comp[1][0] = -1*matrix[0][1];
  comp[1][1] = matrix[0][0];

  return comp;
}

const scalarMultMatrix = (matrix,scalar)=>{
  var List = [];
  for (var i=0; i<matrix.length; i++){
      List = List.concat([[]]);
  }

  for (var i=0; i<matrix.length; i++){
      for (var j=0; j<matrix[0].length; j++){
          List[i][j] = scalar*matrix[i][j];
      }
  }

  return List;
}
const invertMatrix = (matrix)=>{
  var composite = compositeMatrix(matrix);
  var transpose = transposeMatrix(composite);
  var determinant = detMatrix(matrix);
  var scalar = 1/determinant;
  var scalarMult = scalarMultMatrix(transpose,scalar);

  return scalarMult;
}