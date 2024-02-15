export async function imageToUrl(image: any): Promise<string> {
  try {
    const mime = image.mimetype;
    const bstr = atob(image.buffer);
    const u8arr = Uint8Array.from(bstr, char => char.charCodeAt(0));
    
    return URL.createObjectURL(new Blob([u8arr], {type: mime})); 
  } catch(error){
    return '';
  }
}