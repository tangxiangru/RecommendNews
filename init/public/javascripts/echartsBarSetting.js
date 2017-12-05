// Use Jquery set postion
// echarts setting
// 基于准备好的dom，初始化echarts实例

// bar
var myChart = echarts.init(document.getElementById('bar'));

barOption = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['男生', '女生']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisTick : {show: false},
            data : ['北京大学','浙江大学','清华大学','上海交通大学','武汉大学','中山大学','复旦大学']
        }
    ],
    series : [

        {
            name:'男生',
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true
                }
            },
            data:[362,370,325,  244, 240, 236,255,]
        },
        {
            name:'女生',
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'left'
                }
            },
            data:[ 180,120, 118, 128, 142, 130,85]
        }
    ]
};
myChart.setOption(barOption);
