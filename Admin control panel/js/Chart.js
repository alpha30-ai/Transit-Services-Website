// إعدادات الرسم البياني لمبيعات المنتجات
var optionsSales = {
    chart: {
        type: 'line',
        height: 350,
    },
    series: [{
        name: 'المبيعات',
        data: [12, 19, 3, 5, 2, 3]
    }],
    xaxis: {
        categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        title: {
            text: 'الأشهر'
        }
    },
    yaxis: {
        title: {
            text: 'قيمة المبيعات'
        }
    }
};
var salesChart = new ApexCharts(document.querySelector("#salesChart"), optionsSales);
salesChart.render();

// إعدادات الرسم البياني لعدد المستخدمين
var optionsUser = {
    chart: {
        type: 'bar',
        height: 350,
    },
    series: [{
        name: 'عدد المستخدمين',
        data: [3, 5, 2, 7, 4, 8]
    }],
    xaxis: {
        categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        title: {
            text: 'الأشهر'
        }
    },
    yaxis: {
        title: {
            text: 'عدد المستخدمين'
        }
    }
};
var userChart = new ApexCharts(document.querySelector("#userChart"), optionsUser);
userChart.render();

// إعدادات الرسم البياني لنسبة المبيعات حسب الفئة
var optionsCategorySales = {
    chart: {
        type: 'donut',
        height: 350,
    },
    series: [44, 55, 41, 17],
    labels: ['الفئة 1', 'الفئة 2', 'الفئة 3', 'الفئة 4'],
    title: {
        text: 'نسبة المبيعات حسب الفئة'
    }
};
var categorySalesChart = new ApexCharts(document.querySelector("#categorySalesChart"), optionsCategorySales);
categorySalesChart.render();

// إعدادات الرسم البياني لعدد الزيارات
var optionsVisitor = {
    chart: {
        type: 'pie',
        height: 350,
    },
    series: [30, 50, 20],
    labels: ['الزيارات اليومية', 'الزيارات الأسبوعية', 'الزيارات الشهرية'],
    title: {
        text: 'عدد الزيارات'
    }
};
var visitorChart = new ApexCharts(document.querySelector("#visitorChart"), optionsVisitor);
visitorChart.render();

// إعدادات الرسم البياني لأداء البائعين
var optionsSellerPerformance = {
    chart: {
        type: 'radar',
        height: 350,
    },
    series: [{
        name: 'أداء البائعين',
        data: [65, 59, 90, 81, 56]
    }],
    labels: ['البائع 1', 'البائع 2', 'البائع 3', 'البائع 4', 'البائع 5'],
    title: {
        text: 'أداء البائعين'
    }
};
var sellerPerformanceChart = new ApexCharts(document.querySelector("#sellerPerformanceChart"), optionsSellerPerformance);
sellerPerformanceChart.render();

// إعدادات الرسم البياني لنمو المبيعات
var optionsSalesGrowth = {
    chart: {
        type: 'bar',
        height: 350,
    },
    series: [{
        name: 'نمو المبيعات',
        data: [20, 15, 30, 25, 35, 40]
    }],
    xaxis: {
        categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        title: {
            text: 'الأشهر'
        }
    },
    yaxis: {
        title: {
            text: 'نمو المبيعات'
        }
    }
};
var salesGrowthChart = new ApexCharts(document.querySelector("#salesGrowthChart"), optionsSalesGrowth);
salesGrowthChart.render();

// إعدادات الرسم البياني لتحليل المنتجات
var optionsProductAnalysis = {
    chart: {
        type: 'donut',
        height: 350,
    },
    series: [300, 50, 100, 70],
    labels: ['المنتج 1', 'المنتج 2', 'المنتج 3', 'المنتج 4'],
    title: {
        text: 'تحليل المنتجات'
    }
};
var productAnalysisChart = new ApexCharts(document.querySelector("#productAnalysisChart"), optionsProductAnalysis);
productAnalysisChart.render();

// إعدادات الرسم البياني لرضا العملاء
var optionsCustomerSatisfaction = {
    chart: {
        type: 'pie',
        height: 350,
    },
    series: [60, 30, 10],
    labels: ['راضي', 'غير راضي', 'محايد'],
    title: {
        text: 'رضا العملاء'
    }
};
var customerSatisfactionChart = new ApexCharts(document.querySelector("#customerSatisfactionChart"), optionsCustomerSatisfaction);
customerSatisfactionChart.render();

// إعدادات الرسم البياني لشعبية المنتجات
var optionsProductPopularity = {
    chart: {
        type: 'donut',
        height: 350,
    },
    series: [40, 30, 20, 10],
    labels: ['المنتج 1', 'المنتج 2', 'المنتج 3', 'المنتج 4'],
    title: {
        text: 'شعبية المنتجات'
    }
};
var productPopularityChart = new ApexCharts(document.querySelector("#productPopularityChart"), optionsProductPopularity);
productPopularityChart.render();
