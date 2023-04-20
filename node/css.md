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