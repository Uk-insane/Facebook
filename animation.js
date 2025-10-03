(() => {
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const TAU = Math.PI * 2;

  const particles = [];
  const NUM = Math.floor(Math.min(120, (w * h) / 11000));

  function rand(a,b) { return Math.random()*(b-a)+a; }

  class P {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = rand(0, w);
      this.y = rand(0, h);
      this.r = rand(0.6, 2.4);
      this.alpha = rand(0.06, 0.22);
      this.speed = rand(0.1, 0.8);
      this.angle = rand(0, TAU);
      this.orbit = rand(20, Math.max(w,h)/3);
      this.centerX = this.x;
      this.centerY = this.y;
      this.phase = rand(0, TAU);
    }
    step(t){
      this.phase += 0.01 * this.speed;
      this.x = this.centerX + Math.cos(this.phase + this.angle) * this.orbit * Math.sin(t*0.0002 + this.angle);
      this.y = this.centerY + Math.sin(this.phase + this.angle) * this.orbit * Math.cos(t*0.0001 + this.angle);
    }
    draw(){
      ctx.beginPath();
      ctx.fillStyle = `rgba(180,220,255,${this.alpha})`;
      ctx.arc(this.x, this.y, this.r, 0, TAU);
      ctx.fill();
    }
  }

  function init(){
    particles.length = 0;
    for(let i=0;i<NUM;i++) particles.push(new P());
  }

  let last = performance.now();
  function loop(now){
    const dt = now - last;
    last = now;

    ctx.clearRect(0,0,w,h);

    // subtle gradient background
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0, '#051024');
    g.addColorStop(1, '#021018');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    // soft glow
    ctx.globalCompositeOperation = 'lighter';
    particles.forEach(p => {
      p.step(now);
      p.draw();
    });
    ctx.globalCompositeOperation = 'source-over';

    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    init();
  });

  init();
  requestAnimationFrame(loop);
})();
