const a = true;
if (a) {
    const m1 = await import('./func.js');
    console.log(m1);
    const m2 = await import('./var.js');
    console.log(m2);
}
