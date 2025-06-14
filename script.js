// DOM Elements
const previewButton = document.getElementById('preview-button');
const sizeControl = document.getElementById('size-control');
const styleControl = document.getElementById('style-control');
const shapeControl = document.getElementById('shape-control');
const labelControl = document.getElementById('label-control');
const iconControl = document.getElementById('icon-control');
const disabledControl = document.getElementById('disabled-control');
const generatedCode = document.getElementById('generated-code');

// Update button preview and code
function updateButton() {
    // Get current values
    const size = sizeControl.value;
    const style = styleControl.value;
    const shape = shapeControl.value;
    const label = labelControl.value;
    const icon = iconControl.value;
    const disabled = disabledControl.checked;

    // Update preview button classes
    previewButton.className = `m3-button ${size} ${style} ${shape}`;
    previewButton.disabled = disabled;

    // Update icon
    const iconElement = previewButton.querySelector('.icon');
    if (icon === 'none') {
        if (iconElement) iconElement.remove();
    } else {
        if (!iconElement) {
            const newIcon = document.createElement('span');
            newIcon.className = 'material-symbols-sharp icon';
            previewButton.insertBefore(newIcon, previewButton.firstChild);
        }
        previewButton.querySelector('.icon').textContent = icon;
    }

    // Update label
    previewButton.querySelector('.label').textContent = label;

    // Generate and update code
    const code = generateButtonCode(size, style, shape, label, icon, disabled);
    generatedCode.textContent = code;
}

// Generate button HTML code
function generateButtonCode(size, style, shape, label, icon, disabled) {
    const classes = [`m3-button`, size, style, shape].join(' ');
    const disabledAttr = disabled ? ' disabled' : '';
    
    let iconHtml = '';
    if (icon !== 'none') {
        iconHtml = `\n    <span class="material-symbols-sharp icon">${icon}</span>`;
    }

    return `<button class="${classes}"${disabledAttr}>${iconHtml}
    <span class="label">${label}</span>
</button>`;
}

// Event listeners
sizeControl.addEventListener('change', updateButton);
styleControl.addEventListener('change', updateButton);
shapeControl.addEventListener('change', updateButton);
labelControl.addEventListener('input', updateButton);
iconControl.addEventListener('change', updateButton);
disabledControl.addEventListener('change', updateButton);

// Initialize button
updateButton();

// Add ripple effect to buttons
document.querySelectorAll('.m3-button').forEach(button => {
    button.addEventListener('click', function(e) {
        if (button.disabled) return;
        
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            background-color: currentColor;
            border-radius: 50%;
            opacity: 0.3;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 