# Temporary tooling: derive chrome-free cinematic crops for the BETTR and
# FrankenTeen case-study redesigns from existing repository source images.
# Reads sources only; writes only into assets/bettr/ and assets/frankenteen/.
Add-Type -AssemblyName System.Drawing

function Crop-Jpg($src, $dst, $x, $y, $w, $h) {
    $img = [System.Drawing.Image]::FromFile((Resolve-Path $src))
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = 'HighQualityBicubic'
    $srcRect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($img, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
        Where-Object { $_.MimeType -eq 'image/jpeg' }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
        [System.Drawing.Imaging.Encoder]::Quality, [long]90)
    $bmp.Save($dst, $codec, $ep)
    $g.Dispose(); $bmp.Dispose(); $img.Dispose()
    Write-Output ("{0} : {1}x{2}" -f $dst, $w, $h)
}

$root = Split-Path $PSScriptRoot -Parent

# --- BETTR: strip browser chrome + DevTools panel from raw session captures ---
Crop-Jpg (Join-Path $root 'assets\bettr\stage1-sorting.jpeg') (Join-Path $root 'assets\bettr\stage1-crop.jpg') 0 105 1630 970
Crop-Jpg (Join-Path $root 'assets\bettr\stage2-timer.jpeg')   (Join-Path $root 'assets\bettr\stage2-crop.jpg') 0 105 1630 970
Crop-Jpg (Join-Path $root 'assets\bettr\stage4-final.jpeg')   (Join-Path $root 'assets\bettr\stage4-crop.jpg') 0 105 1630 965
Crop-Jpg (Join-Path $root 'assets\bettr\landing.jpeg')        (Join-Path $root 'assets\bettr\landing-crop.jpg') 0 63 1918 1015

# --- FrankenTeen: isolate clean design-doc panels, excluding editor chrome/annotation rings ---
Crop-Jpg (Join-Path $root 'assets\frankenteen\ui-development.jpg') (Join-Path $root 'assets\frankenteen\ui-notebook-crop.jpg') 90 280 560 310
Crop-Jpg (Join-Path $root 'assets\frankenteen\ui-development.jpg') (Join-Path $root 'assets\frankenteen\ui-paused-crop.jpg') 1890 1000 660 390
Crop-Jpg (Join-Path $root 'assets\frankenteen\level-design-greybox.jpg') (Join-Path $root 'assets\frankenteen\act1-dorm-crop.jpg') 1095 505 655 440
Crop-Jpg (Join-Path $root 'assets\frankenteen\world-map.jpg') (Join-Path $root 'assets\frankenteen\town-overview-crop.jpg') 45 730 1400 720
Crop-Jpg (Join-Path $root 'assets\frankenteen\world-map.jpg') (Join-Path $root 'assets\frankenteen\act3-mansion-crop.jpg') 1770 1050 780 400
