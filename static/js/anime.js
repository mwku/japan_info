let Old = 0;

function DateChangingAnimate(Date){
    const OldElement = document.getElementById(`d${Old+1}`);
    const NewElement = document.getElementById(`d${Date+1}`);
    // rgb(0, 0, 151)
    OldElement.removeAttribute('style');
    NewElement.style.color = "rgb(0, 0, 151)";
    NewElement.style.borderTop = "2px solid #00b4b2";
    NewElement.style.borderBottom = "2px solid yellow";
    //滑動特效
    ScrollDateToCenter(Date);
    Old = Date;
}

function ScrollDateToCenter(index) {
    const bottomBar = document.getElementById("BottomBar");
    const dateId = `d${index+1}`;
    const dateElement = document.getElementById(dateId);
    
    if (!dateElement || !bottomBar) return;
    
    // 計算需要滾動的距離
    const elementLeft = dateElement.offsetLeft;
    const elementWidth = dateElement.offsetWidth;
    const containerWidth = bottomBar.clientWidth;
    
    // 目標位置：元素中心 - 容器中心
    const targetScroll = elementLeft + elementWidth / 2 - containerWidth / 2;
    
    // 使用平滑滾動
    bottomBar.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
    });
}