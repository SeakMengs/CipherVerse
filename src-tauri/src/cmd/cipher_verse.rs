// https://github.com/Sukaato/blob-downloader/blob/main/src-tauri/src/cmd/ffmpeg.rs
#[tauri::command]
pub async fn cipher_verse<R: tauri::Runtime>(
    window: tauri::Window<R>,
    args: Vec<String>,
) -> Result<(), String> {
    let command = tauri::api::process::Command::new_sidecar("cipher_verse").unwrap();
    let (mut rx, _) = command.args(args).spawn().unwrap();

    tauri::async_runtime::spawn(async move {
        // read events such as stdout
        while let Some(event) = rx.recv().await {
            match event {
                tauri::api::process::CommandEvent::Stdout(line) => {
                    window.emit("cipher_verse_message", line).unwrap();
                }
                tauri::api::process::CommandEvent::Stderr(line) => {
                    window.emit("cipher_verse_message", line).unwrap();
                }
                tauri::api::process::CommandEvent::Error(err) => {
                    window.emit("cipher_verse_message", err).unwrap();
                },
                tauri::api::process::CommandEvent::Terminated(_) => {
                    window.emit("cipher_verse_message", "Terminated").unwrap();
                },
                _ => todo!(),
            }
        }
    });

    Ok(())
}
