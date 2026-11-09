# Converts .docx files to PDF with Microsoft Word (local check only, Windows + Word required).
# Usage: powershell -File scripts/to-pdf.ps1 file1.docx [file2.docx ...]
param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Files)
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
  foreach ($f in $Files) {
    $full = (Resolve-Path $f).Path
    $pdf = [IO.Path]::ChangeExtension($full, ".pdf")
    $doc = $word.Documents.Open($full, $false, $true)
    $doc.SaveAs([ref]$pdf, [ref]17)  # 17 = wdFormatPDF
    $pages = $doc.ComputeStatistics(2)  # 2 = wdStatisticPages
    $doc.Close([ref]$false)
    "$pdf ($pages pages)"
  }
} finally {
  $word.Quit()
}
