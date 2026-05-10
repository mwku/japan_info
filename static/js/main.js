//                                             _ooOoo
//                                            o8888888o
//                                            88" . "88
//                                            (| -_- |)
//                                            O\  =  /O
//                                          ___/`---'\____
//                                       .'  \\|     |//  `.
//                                      /  \\|||  :  |||//  \
//                                     /  _||||| -:- |||||_  \
//                                     |   | \\\  -  /// |   |
//                                     | \_|  ''\---/''  |   |
//                                     \  .-\__       __/-.  /
//                                   ___`. .'  /--.--\ `. . __
//                                ."" '<  `.___\_<|>_/__.'  >'"".
//                               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//                               \  \ `-.   \_ __\ /__ _/   .-` /  /
//                          ======`-.____`-.___\_____/___.-`____.-'======
//                                             `=---='
//                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                                      佛祖保佑       永無BUG

let DateList = [];
let NowActiveDate = 0;

function CreateDateList() {
    return fetch('./static/json/date.json')
        .then(response => response.json())
        .then(data => {
            DateList = data;
            let result = "";
            for(let i = 0; i < data.length; i++){
                result += `<div class="date-option" id="${data[i][1]}" onclick="DateOptionClick(${i})">
                    ${data[i][0]}
                </div>\n`
            }
            DateOptionClick(0);
            return result;
        })
        .catch(error => {
            console.error('Error fetching date data:', error);
        });
}

function updateActiveDate(id) {
    return fetch(`./static/json/${id}.json`)
        .then(response => response.json())
        .then(data => {
            // Handle the fetched data
            let result = `<!-- spacer -->
        <div style="height: 50px; width: 1px;"></div> `;
            for(let i = 0; i < data.length; i++){
                if(data[i].type === "location"){
                    result += `<div class="cell">
                                    <div class="header">
                                        <h1>${data[i].data[0]}</h1>
                                    </div>
                                    <!-- <div class="split-line"></div> -->
                                    <div class="content">
                                        ${data[i].data[1]}
                                    `
                    if(data[i].warning !== ""){
                        result += `<div class="warning">${data[i].warning}</div>`;
                    }
                    result += `</div></div>`;
                }else if(data[i].type === "transport"){
                    result += `<div class="cell" style="align-items: center;">
                                    <div class="split-line" style="border-top: 1px dashed #fff;"></div>
                                    <div class="content" style="text-align: center;">
                                        ⬇<br>`
                    for(let j = 0; j < data[i].data.length; j++){
                        result += `${data[i].data[j]}<br>`;
                        if(j !== data[i].data.length-1){
                            result += `⬇<br>`;
                        }
                    }
                    if(data[i].warning !== ""){
                        result += `<div class="warning">${data[i].warning}</div>`;
                    }
                    result += `⬇</div>
                                    <div class="split-line" style="border-top: 1px dashed #fff; margin-top:12px;"></div>
                                </div>`;
                }
            }
            console.log("updateActiveDate result:", result);
            return result;
        })
        .catch(error => {
            console.error('Error fetching active date data:', error);
        });
}

function DateOptionClick(index) {
    // console.log("click index:", index);
    // console.log("click data:", DateList[index]);
    const Id = DateList[index][1];
    const container = document.getElementById("container");
    container.innerHTML = "";
    updateActiveDate(Id).then(result => {
        container.innerHTML = result;
    });
    
}

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("BottomBar");
    CreateDateList().then(result => {
        container.innerHTML = result+`<div class="underline"></div>`;
    });
});