const loaderWrapperEs = document.querySelectorAll('.fg-progress');
class CircleLoaderGrid{
    constructor(targetE,count,avSpeed){
        this.avSpeed = avSpeed ? avSpeed : 10; 
        this.count = count; 
        this.step = 360 / this.count;
        this.targetE = targetE;
        this.poinEsList = []; 
    }
    AddPoint(pers){
        const pointE = document.createElement('div');
        pointE.classList.add('fg-progress__point');
        this.poinEsList.push({pers, element: pointE});
        this.targetE.append(pointE);
        return pointE;
    }
    AddPoints(){
        for(let i = 0; i < this.count; i++){
            const pers = i * this.step; 
            const point = this.AddPoint(pers);
            const rotation = i * this.step;
            point.style.transform = `rotate(${rotation}deg)`;
        }
    }
    ResetPersantage(){
        this.poinEsList.forEach((obj, i)=> {
            const pointE = obj.element;
            setTimeout(()=>{
                pointE.classList.remove('active');
            }, this.avSpeed * i);
        })
    }
    SetPersantage(pers){
        if(pers > 100) pers = 100;
        if(pers <= 0) pers = 0;
        const higlightCount = Math.floor((this.count * pers) / 100);
        this.ResetPersantage();
        for(let i = 0; i < higlightCount; i++){
            const pointE = this.poinEsList[i].element;
            setTimeout(()=>{
                pointE.classList.add('active');
            }, this.avSpeed * i);
        }
    }
}

loaderWrapperEs.forEach(e=>{
  const persAttr = e.getAttribute('pers-number');
  const pers = parseInt(persAttr); 
  const testPers = new CircleLoaderGrid(e, 25);
  testPers.AddPoints();
  testPers.SetPersantage(pers);
  const persentageNumberE = e.querySelector('.fg-progress__number');
  persentageNumberE.innerHTML = pers;
})



// function loderAv(){
//     const persInput = document.querySelector('#loaderPersInput');
//     const persentageNumberE = document.querySelector('.persentageNumber');
//     const pers = parseInt(persInput.value); 
//     persentageNumberE.innerHTML = ${pers};
//     testPers.SetPersantage(pers);
// }

// function resetPers(){
//     testPers.ResetPersantage();
// }