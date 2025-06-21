#![warn(missing_docs)]

//! Image processing module which is exposed to JS environment

use base64::prelude::*;
use image::{DynamicImage, GenericImageView, ImageFormat, load_from_memory};
use std::io::Cursor;
use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1 as log;

#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
}

/// Function applies image filters to image instance reference
#[allow(clippy::too_many_arguments)]
fn apply_image_filters(
  img: &mut DynamicImage,
  grayscale_flag: bool,
  flip_vertically_flag: bool,
  flip_horizontally_flag: bool,
  invert_colors_flag: bool,
  rotate: i32,
  blur: f32,
  brighten: i32,
  huerotate: i32,
  contrast: f32,
  unsharpen: f32,
  crop_x: u32,
  crop_y: u32,
  crop_width: u32,
  crop_height: u32,
) {
  let (image_width, image_height) = &img.dimensions();

  if crop_width != *image_width && crop_height != *image_height {
    *img = img.crop_imm(crop_x, crop_y, crop_width, crop_height);
  }

  if grayscale_flag {
    *img = img.grayscale();
  }

  if flip_vertically_flag {
    *img = img.flipv();
  }

  if flip_horizontally_flag {
    *img = img.fliph();
  }

  if invert_colors_flag {
    img.invert();
  }

  match rotate {
    90 => *img = img.rotate90(),
    180 => *img = img.rotate180(),
    270 => *img = img.rotate270(),
    _ => (),
  }

  if blur > 0.0 {
    *img = img.blur(blur);
  }

  if brighten != 0 {
    *img = img.brighten(brighten);
  }

  if huerotate != 0 {
    *img = img.huerotate(huerotate);
  }

  if contrast != 0.0 {
    *img = img.adjust_contrast(contrast);
  }

  if unsharpen != 0.0 {
    *img = img.unsharpen(unsharpen, 20);
  }
}

/// Becomes a wasm module
///
/// Functions does basic operation on image file like decoding, processing filters and returns
/// processed encoded result
///
/// Usage:
/// ```typescript
/// const wasm = await import("path_to_wasm_pkg");
/// wasm.process_image(...args);
/// ```
#[allow(clippy::too_many_arguments)]
#[wasm_bindgen]
pub fn process_image(
  encoded_file: &str,
  grayscale_flag: bool,
  flip_vertically_flag: bool,
  flip_horizontally_flag: bool,
  invert_colors: bool,
  rotate: i32,
  blur: f32,
  brighten: i32,
  huerotate: i32,
  contrast: f32,
  unsharpen: f32,
  crop_x: u32,
  crop_y: u32,
  crop_width: u32,
  crop_height: u32,
) -> String {
  let base64_to_vector = BASE64_STANDARD.decode(encoded_file).unwrap();
  log(&"Image decoded".into());

  let mut img = load_from_memory(&base64_to_vector).unwrap();
  log(&"Image loaded".into());

  apply_image_filters(
    &mut img,
    grayscale_flag,
    flip_vertically_flag,
    flip_horizontally_flag,
    invert_colors,
    rotate,
    blur,
    brighten,
    huerotate,
    contrast,
    unsharpen,
    crop_x,
    crop_y,
    crop_width,
    crop_height,
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
