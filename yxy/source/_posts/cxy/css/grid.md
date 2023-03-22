---
title: 【grid】简单总结
date: 2023-03-15 18:04:24
categories: css
---

## 一、易记点整理

父：
```css
{
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-rows: 100px 100px 100px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-areas: "a a a"            
                       "b c c"            
                       "b c c";
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
}
```
子：
```css
{
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-area: a a a;
  align-self: center;
  justify-self: center
}
```
属性关键字：
```css
repeat(3,'100px')  // 一列/一行有3个子元素，一个100px
fr
auto // 默认
auto-fill // 换行时一行或一列尽可能塞下最多的
```

## 二、 grid布局

#### (1) 基本使用

```css
.container {  
  display: grid;  
  grid-template-columns: 100px 100px 100px;  grid-template-rows: 100px 100px 100px;  
}
```

上面代码意思是三行三列的布局，行宽100px，高100px，也可以使用百分比

也可以这么简写：
```css
.container {  
  display: grid;
  grid-template-columns:  repeat(3,100px);
  grid-template-rows: repeat(3,100px);  
}
```
`repeat()` 函数有两个参数，第一个是重复的次数，第二个是具体数值

## 三、容器属性：
#### (2) `auto-fill`
有时候，单元格大小固定，而容器大小不一定，可以用auto-fill指定一行/列尽可能放入更多的元素

#### (3) `fr`
grid布局为了方便表示比例，引入fr，如果一个设置1fr，一个设置2fr，那后者就是前者的两倍

```css
.container {  
  display: grid;  
  grid-template-columns: 150px 1fr 2fr;  
}
```

[上面代码](https://jsbin.com/remowec/edit?html,css,output)表示，第一列的宽度为150像素，第二列的宽度是第三列的一半。

#### (4) auto

auto参数表示由浏览器自动决定宽高

#### (5) 行和列的线可以自己命名，用[名字]

```css
{
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```
网格布局允许同一根线有多个名字，比如[fifth-line row-5]。

#### (6) 设置行与行、列与列的间距
`grid-row-gap` 与 `grid-column-gap`，行与列的间距。
`grid-gap`: `grid-row-gap` 与 `grid-column-gap`的简写，两个值。
格式：
`grid-gap`: 行 列
**根据最新标准，****`grid-row-gap`**、**`grid-column-gap`****的新写法是去掉****`grid-前缀`。**

#### (7) `grid-template-areas`
可以给各个网格取名，如果不需要利用该网格，则用.代替
```css
{
  grid-template-row: 100px 100px 100px;
  grid-template-column: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h j'; // 意思是将网格划分为9个区域，每个区域命名
  grid-template-areas: 'a a a'
                       'd d d'
                       'c c c'; // 意思是将网格横向划分为3个区域，每个区域命名a b c
}
```
可以给各个网格取名，如果不需要利用该网格，则用.代替

#### (8) `grid-auto-flow`
子元素按照顺序自动放置在网格内，默认先行后列，设为列的话
```css
grid-auto-flow: column;
```
#### (9) `justify-items` `align-items`

值为`start` `center` `end` `strech`(拉伸占满整个容器，如果有设置width或height则对应拉伸失效)

#### (10) `justify-content` `align-content` 
设置整个内容区域在容器里面的水平位置(左中右)

## 四、容器内部的元素属性

#### (1) `grid-column-start` `grid-column-end` `grid-row-start` `grid-row-end`

设置某个子元素在第几个网格线内
```css
grid-column-start：2
grid-row-end ：1
```
子元素在横向第二根网格线，竖向倒数第一根网格线内。

#### (2) `grid-area`，设置某元素在某个单元格中
```css
.item-1 {  
  grid-area: e;  /* 不要写冒号   */
}
```
#### (3) `justify-self` `align-self` `place-self`

和父元素的`justify-items` `align-items` 一致。
只不过一个设置在父元素上，作用于所有子元素。
一个是设置在子元素上，只对单个子元素有效。

`place-self`用来同时设置`justify-self` `align-self`，简写`justify-self` `align-self`
