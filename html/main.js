import "./assets/css/devresume.css";
import "./assets/css/nidai.css";
import html2canvas from "html2canvas";
import proFileImg from "./assets/images/resume-profile.jpg";
document.querySelector(".resume-profile-image img").src = proFileImg;
let imgUrl = "";
function downloadIamge(imgsrc, name) {
	//下载图片地址和图片名
	const image = new Image();
	// 解决跨域 Canvas 污染问题
	image.setAttribute("crossOrigin", "anonymous");
	image.onload = function () {
		let canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		const context = canvas.getContext("2d");
		context.drawImage(image, 0, 0, image.width, image.height);
		const url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
		const a = document.createElement("a"); // 生成一个a元素
		const event = new MouseEvent("click"); // 创建一个单击事件
		a.download = name || "photo"; // 设置图片名称
		a.href = url; // 将生成的URL设置为a.href属性
		a.dispatchEvent(event); // 触发a的单击事件
	};
	image.src = imgsrc;
}
html2canvas(document.querySelector("#capture")).then((canvas) => {
	document.querySelector("#canvas-content").appendChild(canvas);
	imgUrl = canvas.toDataURL("image/png");
});
document.querySelector("#saveImg").addEventListener("click", function () {
	downloadIamge(imgUrl, "doc.png");
});
