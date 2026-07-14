# Temporary tooling: derive three hero crops from real repository images.
# Reads sources only; writes only into v2-preview/hero-*/ folders.
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

# Concept A: FrankenTeen bedroom (warm rug) from the world-map sheet,
# excluding the annotation arrow (x>710) and the forest band (y>705).
Crop-Jpg (Join-Path $root 'assets\frankenteen\world-map.jpg') `
         (Join-Path $PSScriptRoot 'hero-a\frankenteen-room-crop.jpg') 20 165 690 540

# Concept B: narrow vertical fragment of the BETTR profile motif,
# stopping above the "PROFILE STATUS" label (y<400).
Crop-Jpg (Join-Path $root 'assets\bettr\dashboard-thumb-crop.jpg') `
         (Join-Path $PSScriptRoot 'hero-b\bettr-motif-strip.jpg') 1100 20 240 380

# Concept C: Echoes room game viewport, excluding Unity toolbar and the
# view gizmo icons at top-right (y<92).
Crop-Jpg (Join-Path $root 'assets\echoes\room-scene.jpeg') `
         (Join-Path $PSScriptRoot 'hero-c\echoes-room-crop.jpg') 172 92 488 278
