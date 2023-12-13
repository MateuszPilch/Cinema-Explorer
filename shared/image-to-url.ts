export function imageToUrl(res: any): string {
  try {
    const mime = res.mimetype;
    const bstr = atob(res.buffer);
    let n = bstr.length;

    const u8arr = new Uint8Array(n);
  
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return URL.createObjectURL(new Blob([u8arr], {type: mime}));
  }
  catch(error){
    return '';
  }
}