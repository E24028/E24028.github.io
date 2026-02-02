function clipboard(text)
{
    navigator.clipboard.writeText(text);
    alert(`copied! text: ${text}`);
}
