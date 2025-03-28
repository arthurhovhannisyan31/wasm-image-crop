use base64::prelude::*;
use image::{load_from_memory, GenericImageView, ImageFormat};
use std::io::Cursor;
use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1 as log;

#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
}

#[wasm_bindgen]
pub fn grayscale(encoded_file: &str) -> String {
  log(&"Grayscale called".into());

  let base64_to_vector = BASE64_STANDARD.decode(encoded_file).unwrap();
  log(&"Image decoded".into());

  let mut img = load_from_memory(&base64_to_vector).unwrap();
  log(&"Image loaded".into());

  let dimensions = &img.dimensions();
  log(&format!("{:?}", dimensions).into());

  img = img.grayscale();
  log(&"Grayscale effect applied".into());

  let mut buffer = vec![];
  img
    .write_to(&mut Cursor::new(&mut buffer), ImageFormat::Png)
    .unwrap();
  log(&"New Image written".into());

  let encoded_img = BASE64_STANDARD.encode(&buffer);
  let data_url = format!("data:image/png;base64,{}", encoded_img);

  data_url
}

#[cfg(test)]
mod tests {
  #[test]
  fn it_works() {}
}
