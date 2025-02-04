const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let drawing = false;
let brushColor = '#000000'; // Màu mặc định
let brushSize = 5;
let erasing = false;
let penMode = false;  // Chế độ vẽ bút

// Set up mouse events for drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Set up input elements
document.getElementById('color').addEventListener('input', (e) => {
  brushColor = e.target.value;  // Cập nhật màu sắc đã chọn
});

document.getElementById('brushSize').addEventListener('input', (e) => {
  brushSize = e.target.value;
});

document.getElementById('erase').addEventListener('click', () => {
  erasing = !erasing;
  document.getElementById('erase').innerText = erasing ? 'dừng' : 'Tẩy';
});

document.getElementById('download').addEventListener('click', downloadImage);

// Thêm sự kiện chuyển đổi chế độ bút
document.getElementById('pen').addEventListener('click', () => {
  penMode = !penMode;
  document.getElementById('pen').innerText = penMode ? 'Free Draw' : 'Pen Mode';
  if (penMode) {
    brushSize = 2;  // Kích thước bút nhỏ hơn khi sử dụng bút
  } else {
    brushSize = 5;  // Kích thước bút bình thường khi không phải pen mode
  }
});

function startDrawing(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if (!drawing) return;

  // Chọn màu và độ rộng bút tùy thuộc vào chế độ
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  if (erasing) {
    ctx.strokeStyle = '#FFFFFF'; // Tẩy màu trắng
  } else {
    ctx.strokeStyle = brushColor;
  }

  if (penMode) {
    // Nếu ở Pen Mode, dùng màu sắc đã chọn
    ctx.lineWidth = 2;  // Bút nhỏ hơn
    ctx.strokeStyle = brushColor;  // Vẽ với màu đã chọn
  }

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function stopDrawing() {
  drawing = false;
}

function downloadImage() {
  const link = document.createElement('a');
  link.href = canvas.toDataURL();
  link.download = 'drawing.png';
  link.click();
}
