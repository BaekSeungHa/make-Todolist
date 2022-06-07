<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p id="menuPan"></p>
    <button id="prev"> < </button>
    <button id="next">></button>


    <script>
        let day = 1;

        const nextBtn = document.querySelector("#next");
        const prevBtn = document.querySelector("#prev");

        nextBtn.addEventListener('click',()=>{
           const today = day > 31 ? 31:day+=1; 
            printMeal(today)
        });
        prevBtn.addEventListener('click',()=>{
            const today = day <= 1 ? 1 :day-1;
            printMeal(today)
        });
        
        async function getMeal(day){
           const response = await fetch(
            `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=D10&SD_SCHUL_CODE=7240454&MLSV_YMD=202206${day}`
            )
            return await response.json()
        }

        async function printMeal(today){
            today =  today < 10 ? "0"+today : today;
            console.log(today);
            const data = await getMeal(today)
            const p =  document.querySelector("p");
            console.log(data);
            let meal;

            try{
                meal = data?.mealServiceDietInfo[1]?.row;
            }catch(e){
                meal = [];
            }

            const template = `<div style='color: blue'>
                ${checkMeal(meal)}
                </div>`
            p.innerHTML = template;
        }
        
        function checkMeal(meal) { //급식의 배열이 없다면 오늘 급식은 없음 아니면 메뉴 불러옴 그리고 조식 중식 석식 불러옴
            let temp = ""
            if(meal.length == 0){
                return "오늘의 급식은 없습니다"
            }else{
                meal.forEach((item,idx)=>{
                    const { DDISH_NM:menu,MMEAL_SC_NM:title } =item;
                    temp+=`<h1>${title}</h1>`
                    temp+=menu;
                })
            }
            return temp;
        }
        printMeal(day);
    </script>
</body>
</html>
