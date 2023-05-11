# 居中的方式
text-algn: center 可以让文字 居中 包括div块里面的文字 不能让块级元素居中 
要让元素居中 得取消display: block 或者改为行内元素?(待验证)
display:flex justify-content: center;align-items: center; 
居中


position: relative;
top: 50%;
transform: translateY(-50%);


position: relative;
left: 50%;
transform: translateX(-50%);

left: 50%;
top: 50%;
transform: translate(-50%,-50%);


transition: all 2s ease; 表示所有属性都将使用 2 秒时间来执行过渡动画，并且动画效果为“缓慢结束”。
而 transition: 2s ease; 则只对没有显式指定过渡效果的属性起作用，其含义是设置过渡动画的持续时间为 2 秒，并且动画效果为“缓慢结束”。
因此，如果你想让所有属性都在执行过渡动画时都有一个相同的过渡效果，那么应该使用第一个 CSS 属性；如果你只想为没有指定过渡效果的属性设置过渡动画，那么应该使用第二个 CSS 属性。