HTCalendar.prototype.toString();

3D日历.
整个日历是完整的,连续的.
日历的外观可以像Google地图一样拖放.
鼠标滚轮滚动可以上下移动日历,完成日期的平滑滑动.
样式可调整.

问题：
下拉日期时，本月和上月之间并不能真正明确的分开，因为在一周之内，可能包含上个月的月末和本月的月初。
要用滑动窗口，也许最好使用innerHTML/createElement("TR"), scrollTop 等技术。