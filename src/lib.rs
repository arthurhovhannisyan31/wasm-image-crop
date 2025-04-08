use base64::prelude::*;
use image::{load_from_memory, DynamicImage, GenericImageView, ImageFormat};
use std::io::Cursor;
use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1 as log;

#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
}

fn apply_image_filters(
  img: &mut DynamicImage,
  grayscale_flag: bool,
  flip_vertically_flag: bool,
  flip_horizontally_flag: bool,
  rotate: i32,
  blur: f32,
  brighten: f32,
  huerotate: f32,
  contrast: f32,
  unsharpen: f32,
) {
  log(&&format!("blur {:?}", blur).into());
  log(&&format!("brighten {:?}", brighten).into());
  log(&&format!("huerotate {:?}", huerotate).into());
  log(&&format!("contrast {:?}", contrast).into());
  log(&&format!("unsharpen {:?}", unsharpen).into());

  if grayscale_flag {
    *img = img.grayscale();
    log(&"Grayscale effect applied".into());
  }

  if flip_vertically_flag {
    *img = img.flipv();
  }

  if flip_horizontally_flag {
    *img = img.fliph();
  }

  match rotate {
    90 => *img = img.rotate90(),
    180 => *img = img.rotate180(),
    270 => *img = img.rotate270(),
    _ => (),
  }
}

#[wasm_bindgen]
pub fn process_image(
  encoded_file: &str,
  grayscale_flag: bool,
  flip_vertically_flag: bool,
  flip_horizontally_flag: bool,
  rotate: i32,
  blur: f32,
  brighten: f32,
  huerotate: f32,
  contrast: f32,
  unsharpen: f32,
) -> String {
  // 1 crop|resize
  // 2 apply filters
  let base64_to_vector = BASE64_STANDARD.decode(encoded_file).unwrap();
  log(&"Image decoded".into());

  let mut img = load_from_memory(&base64_to_vector).unwrap();
  log(&"Image loaded".into());

  let dimensions = &img.dimensions();
  log(&format!("{:?}", dimensions).into());

  apply_image_filters(
    &mut img,
    grayscale_flag,
    flip_vertically_flag,
    flip_horizontally_flag,
    rotate,
    blur,
    brighten,
    huerotate,
    contrast,
    unsharpen,
  );

  let mut buffer = vec![];
  img
    .write_to(&mut Cursor::new(&mut buffer), ImageFormat::Png)
    .unwrap();
  log(&"Image processed".into());

  let encoded_img = BASE64_STANDARD.encode(&buffer);
  let data_url = format!("data:image/png;base64,{}", encoded_img);

  data_url
}

#[cfg(test)]
mod tests {
  #[test]
  fn it_works() {}
}
