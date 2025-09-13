/**
 * Advanced Classical Cryptography Suite
 * Educational encryption tool with Caesar and Vigenère ciphers
 * Author: Nikhil Dabhade
 * Purpose: Learning classical cryptography algorithms and their vulnerabilities
 */

// Application state
const AppState = {
    currentTab: 'caesar',
    currentCodeView: 'caesar',
    frequencyChart: null
};

// English letter frequencies for comparison
const ENGLISH_FREQUENCIES = {
    'A': 8.2, 'B': 1.3, 'C': 2.8, 'D': 4.3, 'E': 12.7, 'F': 2.2, 'G': 2.0, 'H': 6.1, 'I': 7.0,
    'J': 0.15, 'K': 0.8, 'L': 4.0, 'M': 2.4, 'N': 6.7, 'O': 7.5, 'P': 1.9, 'Q': 0.10, 'R': 6.0,
    'S': 6.3, 'T': 9.1, 'U': 2.8, 'V': 1.0, 'W': 2.4, 'X': 0.15, 'Y': 2.0, 'Z': 0.07
};

/**
 * Caesar Cipher Implementation
 * Simple substitution cipher with fixed shift value
 * Time Complexity: O(n) where n is the length of input text
 * 
 * @param {string} text - Input text to encrypt/decrypt
 * @param {number} shift - Shift value (1-25)
 * @param {boolean} decrypt - Whether to decrypt (default: false)
 * @returns {string} - Processed text
 */
function caesarCipher(text, shift, decrypt = false) {
    // Normalize shift value and handle decryption
    shift = parseInt(shift);
    if (decrypt) shift = 26 - (shift % 26);
    
    return text.split('').map(char => {
        // Only process alphabetic characters
        if (/[A-Za-z]/.test(char)) {
            // Get character code and normalize to 0-25 range
            const code = char.toUpperCase().charCodeAt(0) - 65;
            
            // Apply Caesar shift with modulo arithmetic for wrap-around
            const shifted = (code + shift) % 26;
            
            // Convert back to character, preserving original case
            const newChar = String.fromCharCode(shifted + 65);
            return char === char.toLowerCase() ? newChar.toLowerCase() : newChar;
        }
        
        // Return non-alphabetic characters unchanged (spaces, punctuation, etc.)
        return char;
    }).join('');
}

/**
 * Vigenère Cipher Implementation
 * Polyalphabetic substitution cipher using a repeating keyword
 * Time Complexity: O(n) where n is the length of input text
 * 
 * @param {string} text - Input text to encrypt/decrypt
 * @param {string} key - Encryption key (letters only)
 * @param {boolean} decrypt - Whether to decrypt (default: false)
 * @returns {string} - Processed text
 */
function vigenereCipher(text, key, decrypt = false) {
    // Normalize key: uppercase and remove non-alphabetic characters
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    
    // Return original text if key is empty
    if (key.length === 0) return text;
    
    let keyIndex = 0;
    
    return text.split('').map(char => {
        // Only process alphabetic characters
        if (/[A-Za-z]/.test(char)) {
            // Get character codes normalized to 0-25
            const textCode = char.toUpperCase().charCodeAt(0) - 65;
            const keyCode = key[keyIndex % key.length].charCodeAt(0) - 65;
            
            // Apply Vigenère formula: E(i) = (P(i) + K(i mod m)) mod 26
            let shifted;
            if (decrypt) {
                // Decryption: D(i) = (C(i) - K(i mod m) + 26) mod 26
                shifted = (textCode - keyCode + 26) % 26;
            } else {
                // Encryption: E(i) = (P(i) + K(i mod m)) mod 26
                shifted = (textCode + keyCode) % 26;
            }
            
            // Increment key position only for alphabetic characters
            keyIndex++;
            
            // Convert back to character, preserving original case
            const newChar = String.fromCharCode(shifted + 65);
            return char === char.toLowerCase() ? newChar.toLowerCase() : newChar;
        }
        
        // Return non-alphabetic characters unchanged
        return char;
    }).join('');
}

/**
 * Brute Force Attack Simulation for Caesar Cipher
 * Tries all possible shift values (1-25) to break the cipher
 * Demonstrates the weakness of Caesar cipher due to small key space
 * 
 * @param {string} ciphertext - Text to attack
 * @returns {Array} - Array of all possible decryptions
 */
function bruteForceCaesar(ciphertext) {
    const results = [];
    
    // Try all possible shift values
    for (let shift = 1; shift <= 25; shift++) {
        const decrypted = caesarCipher(ciphertext, shift, true);
        results.push({
            shift: shift,
            text: decrypted,
            // Simple heuristic: count common English words/patterns
            score: calculateReadabilityScore(decrypted)
        });
    }
    
    // Sort by readability score (highest first)
    return results.sort((a, b) => b.score - a.score);
}

/**
 * Simple readability scoring for brute force results
 * Counts common English patterns to identify likely plaintext
 * 
 * @param {string} text - Text to score
 * @returns {number} - Readability score
 */
function calculateReadabilityScore(text) {
    const commonWords = ['THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL', 'CAN', 'HER', 'WAS', 'ONE', 'OUR', 'HAD', 'DAY'];
    const upperText = text.toUpperCase();
    let score = 0;
    
    // Count occurrences of common English words
    commonWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = upperText.match(regex);
        score += matches ? matches.length * word.length : 0;
    });
    
    // Bonus for common English letter frequency patterns
    const eCount = (upperText.match(/E/g) || []).length;
    const tCount = (upperText.match(/T/g) || []).length;
    score += (eCount + tCount) * 0.5;
    
    return score;
}

/**
 * Frequency Analysis Function
 * Analyzes letter frequencies in text for cryptanalysis
 * Essential for breaking substitution ciphers
 * 
 * @param {string} text - Text to analyze
 * @returns {Object} - Frequency analysis results
 */
function frequencyAnalysis(text) {
    const frequencies = {};
    let totalLetters = 0;
    
    // Count each letter occurrence
    for (const char of text.toUpperCase()) {
        if (/[A-Z]/.test(char)) {
            frequencies[char] = (frequencies[char] || 0) + 1;
            totalLetters++;
        }
    }
    
    // Convert counts to percentages and create analysis array
    const analysis = [];
    for (const [letter, count] of Object.entries(frequencies)) {
        analysis.push({
            letter: letter,
            count: count,
            frequency: totalLetters > 0 ? ((count / totalLetters) * 100).toFixed(2) : 0
        });
    }
    
    // Sort by frequency (descending order)
    return {
        data: analysis.sort((a, b) => b.count - a.count),
        totalLetters: totalLetters
    };
}

/**
 * Kasiski Examination for Vigenère Cipher
 * Finds repeated sequences to estimate key length
 * Critical method for breaking Vigenère encryption
 * 
 * @param {string} ciphertext - Encrypted text to analyze
 * @returns {Object} - Analysis results with suggested key lengths
 */
function kasiskiExamination(ciphertext) {
    const text = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
    const trigrams = {};
    const distances = [];
    const repeatedSequences = [];
    
    // Find all trigrams (3-letter sequences) and their positions
    for (let i = 0; i <= text.length - 3; i++) {
        const trigram = text.substr(i, 3);
        if (!trigrams[trigram]) {
            trigrams[trigram] = [];
        }
        trigrams[trigram].push(i);
    }
    
    // Calculate distances between repeated trigrams
    for (const [trigram, positions] of Object.entries(trigrams)) {
        if (positions.length > 1) {
            const sequenceDistances = [];
            for (let i = 1; i < positions.length; i++) {
                const distance = positions[i] - positions[i-1];
                distances.push(distance);
                sequenceDistances.push(distance);
            }
            
            repeatedSequences.push({
                sequence: trigram,
                positions: positions,
                distances: sequenceDistances
            });
        }
    }
    
    // Find possible key lengths using GCD of distances
    const possibleKeyLengths = [];
    if (distances.length > 0) {
        // Calculate GCD of all distances
        const overallGcd = distances.reduce(gcd);
        
        // Find factors of the GCD that could be reasonable key lengths
        for (let i = 2; i <= Math.min(overallGcd, 20); i++) {
            if (overallGcd % i === 0) {
                possibleKeyLengths.push(i);
            }
        }
    }
    
    return {
        repeatedSequences: repeatedSequences.slice(0, 10), // Show top 10
        distances: distances,
        possibleKeyLengths: possibleKeyLengths,
        suggestedKeyLength: possibleKeyLengths[0] || null
    };
}

/**
 * Greatest Common Divisor calculation using Euclidean algorithm
 * Helper function for Kasiski examination
 * 
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - GCD of a and b
 */
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

/**
 * Index of Coincidence calculation
 * Statistical measure for determining if text is encrypted with polyalphabetic cipher
 * 
 * @param {string} text - Text to analyze
 * @returns {number} - Index of Coincidence value
 */
function indexOfCoincidence(text) {
    const counts = {};
    let total = 0;
    
    // Count letter frequencies
    for (const char of text.toUpperCase()) {
        if (/[A-Z]/.test(char)) {
            counts[char] = (counts[char] || 0) + 1;
            total++;
        }
    }
    
    // Calculate IC = Σ(ni * (ni-1)) / (N * (N-1))
    let sum = 0;
    for (const count of Object.values(counts)) {
        sum += count * (count - 1);
    }
    
    return total > 1 ? sum / (total * (total - 1)) : 0;
}

// DOM manipulation and event handling functions

/**
 * Initialize the application when DOM is loaded
 */
function initializeApp() {
    setupTabNavigation();
    setupCaesarCipher();
    setupVigenereCipher();
    setupCodeViewer();
    setupCopyButtons();
    setupAnalysisTools();
    
    // Initialize with Caesar cipher
    switchTab('caesar');
}

/**
 * Setup tab navigation functionality
 */
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const tabName = button.dataset.tab;
            console.log('Tab clicked:', tabName); // Debug log
            
            // Update active button first
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Then switch tab
            switchTab(tabName);
        });
    });
}

/**
 * Switch between different tabs
 * @param {string} tabName - Name of tab to switch to
 */
function switchTab(tabName) {
    console.log('Switching to tab:', tabName); // Debug log
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
        tab.classList.add('hidden');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(`${tabName}-tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
        selectedTab.classList.remove('hidden');
        console.log('Tab switched successfully'); // Debug log
    } else {
        console.error('Tab not found:', `${tabName}-tab`);
    }
    
    AppState.currentTab = tabName;
    
    // Initialize specific tab content
    if (tabName === 'analysis') {
        setTimeout(() => initializeFrequencyChart(), 100);
    }
}

/**
 * Setup Caesar cipher functionality with real-time processing
 */
function setupCaesarCipher() {
    const shiftSlider = document.getElementById('caesar-shift');
    const shiftValue = document.getElementById('caesar-shift-value');
    const inputText = document.getElementById('caesar-input');
    const outputText = document.getElementById('caesar-output');
    const modeInputs = document.querySelectorAll('input[name="caesar-mode"]');
    const bruteForceBtn = document.getElementById('brute-force-caesar');
    
    if (!shiftSlider || !shiftValue || !inputText || !outputText) {
        console.error('Caesar cipher elements not found');
        return;
    }
    
    // Real-time shift value display and processing
    shiftSlider.addEventListener('input', (e) => {
        const newValue = e.target.value;
        shiftValue.textContent = newValue;
        console.log('Shift changed to:', newValue); // Debug log
        processCaesarText();
    });
    
    shiftSlider.addEventListener('change', (e) => {
        const newValue = e.target.value;
        shiftValue.textContent = newValue;
        processCaesarText();
    });
    
    // Real-time text processing
    inputText.addEventListener('input', processCaesarText);
    inputText.addEventListener('keyup', processCaesarText);
    
    // Mode change handling
    modeInputs.forEach(input => {
        input.addEventListener('change', processCaesarText);
    });
    
    // Brute force attack demonstration
    if (bruteForceBtn) {
        bruteForceBtn.addEventListener('click', demonstrateBruteForce);
    }
    
    function processCaesarText() {
        const text = inputText.value;
        const shift = parseInt(shiftSlider.value);
        const isDecrypt = document.querySelector('input[name="caesar-mode"]:checked')?.value === 'decrypt';
        
        if (text.trim()) {
            const result = caesarCipher(text, shift, isDecrypt);
            outputText.value = result;
            updateCaesarExplanation(text, shift, isDecrypt, result);
        } else {
            outputText.value = '';
            updateCaesarExplanation('', shift, isDecrypt, '');
        }
    }
    
    function updateCaesarExplanation(input, shift, isDecrypt, output) {
        const explanation = document.getElementById('caesar-explanation');
        
        if (!explanation) return;
        
        if (input.trim()) {
            const operation = isDecrypt ? 'Decryption' : 'Encryption';
            const formula = isDecrypt ? `D(x) = (x - ${shift}) mod 26` : `E(x) = (x + ${shift}) mod 26`;
            const example = getLetterExample(input.toUpperCase().replace(/[^A-Z]/g, '')[0], shift, isDecrypt);
            
            explanation.innerHTML = `
                <p><strong>Operation:</strong> ${operation} with shift value ${shift}</p>
                <p><strong>Formula:</strong> ${formula}</p>
                <p><strong>Example:</strong> ${example}</p>
                <p><strong>Key Space:</strong> Only 25 possible keys (very insecure!)</p>
            `;
        } else {
            explanation.innerHTML = `
                <p><strong>Formula:</strong> E(x) = (x + n) mod 26 for encryption</p>
                <p><strong>Example:</strong> With shift=3, 'A' becomes 'D', 'B' becomes 'E', etc.</p>
                <p><strong>Security:</strong> Extremely weak - only 25 possible keys</p>
            `;
        }
    }
    
    function getLetterExample(letter, shift, isDecrypt) {
        if (!letter) return "Enter text to see example";
        
        const originalCode = letter.charCodeAt(0) - 65;
        let newCode;
        
        if (isDecrypt) {
            newCode = (originalCode - shift + 26) % 26;
        } else {
            newCode = (originalCode + shift) % 26;
        }
        
        const newLetter = String.fromCharCode(newCode + 65);
        const arrow = '→';
        
        return `'${letter}' ${arrow} '${newLetter}'`;
    }
    
    function demonstrateBruteForce() {
        const ciphertext = outputText.value;
        
        if (!ciphertext.trim()) {
            showNotification('Please enter some text and encrypt it first!', 'error');
            return;
        }
        
        const resultsDiv = document.getElementById('brute-force-results');
        if (!resultsDiv) {
            console.error('Brute force results div not found');
            return;
        }
        
        resultsDiv.classList.remove('hidden');
        resultsDiv.innerHTML = '<p><strong>Brute Force Attack Results:</strong></p>';
        
        const results = bruteForceCaesar(ciphertext);
        
        results.slice(0, 10).forEach((result, index) => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'brute-force-result';
            resultDiv.innerHTML = `<strong>Shift ${result.shift}:</strong> ${result.text} <small>(Score: ${result.score.toFixed(1)})</small>`;
            
            if (index === 0) {
                resultDiv.style.borderLeftColor = 'var(--color-success)';
                resultDiv.innerHTML += ' <em>← Most likely plaintext</em>';
            }
            
            resultsDiv.appendChild(resultDiv);
        });
        
        showNotification('Brute force attack completed!', 'success');
    }
    
    // Initial processing
    processCaesarText();
}

/**
 * Setup Vigenère cipher functionality with real-time processing
 */
function setupVigenereCipher() {
    const keyInput = document.getElementById('vigenere-key');
    const inputText = document.getElementById('vigenere-input');
    const outputText = document.getElementById('vigenere-output');
    const modeInputs = document.querySelectorAll('input[name="vigenere-mode"]');
    const kasiskiBtn = document.getElementById('kasiski-analysis');
    
    if (!keyInput || !inputText || !outputText) {
        console.error('Vigenère cipher elements not found');
        return;
    }
    
    // Real-time text processing
    keyInput.addEventListener('input', processVigenereText);
    inputText.addEventListener('input', processVigenereText);
    inputText.addEventListener('keyup', processVigenereText);
    
    // Mode change handling
    modeInputs.forEach(input => {
        input.addEventListener('change', processVigenereText);
    });
    
    // Kasiski examination demonstration
    if (kasiskiBtn) {
        kasiskiBtn.addEventListener('click', demonstrateKasiski);
    }
    
    function processVigenereText() {
        const text = inputText.value;
        const key = keyInput.value;
        const isDecrypt = document.querySelector('input[name="vigenere-mode"]:checked')?.value === 'decrypt';
        
        if (text.trim() && key.trim()) {
            const result = vigenereCipher(text, key, isDecrypt);
            outputText.value = result;
            updateVigenereExplanation(text, key, isDecrypt, result);
        } else {
            outputText.value = '';
            updateVigenereExplanation('', key, isDecrypt, '');
        }
    }
    
    function updateVigenereExplanation(input, key, isDecrypt, output) {
        const explanation = document.getElementById('vigenere-explanation');
        const demo = document.getElementById('vigenere-demo');
        
        if (!explanation || !demo) return;
        
        const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
        const keySpace = cleanKey.length > 0 ? `26^${cleanKey.length} = ${Math.pow(26, cleanKey.length).toLocaleString()}` : 'N/A';
        
        // Update main explanation
        explanation.innerHTML = `
            <p><strong>Formula:</strong> E(i) = (P(i) + K(i mod m)) mod 26 where m = key length</p>
            <p><strong>Key Space:</strong> ${keySpace} possible keys</p>
        `;
        
        if (input.trim() && cleanKey) {
            demo.innerHTML = generateVigenereDemo(input, cleanKey, isDecrypt);
        } else {
            demo.innerHTML = '<p>Enter text and key to see step-by-step demonstration</p>';
        }
    }
    
    function generateVigenereDemo(text, key, isDecrypt) {
        const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 20); // Limit for display
        const repeatedKey = key.repeat(Math.ceil(cleanText.length / key.length)).substring(0, cleanText.length);
        
        let demo = '<div class="demo-line"><strong>Text:</strong> ' + cleanText.split('').join(' ') + '</div>';
        demo += '<div class="demo-line"><strong>Key:</strong>  ' + repeatedKey.split('').join(' ') + '</div>';
        
        const operation = isDecrypt ? 'Decryption' : 'Encryption';
        demo += `<div class="demo-line"><strong>${operation}:</strong></div>`;
        
        for (let i = 0; i < Math.min(cleanText.length, 10); i++) {
            const textChar = cleanText[i];
            const keyChar = repeatedKey[i];
            const textCode = textChar.charCodeAt(0) - 65;
            const keyCode = keyChar.charCodeAt(0) - 65;
            
            let resultCode;
            let formula;
            
            if (isDecrypt) {
                resultCode = (textCode - keyCode + 26) % 26;
                formula = `(${textCode} - ${keyCode} + 26) mod 26 = ${resultCode}`;
            } else {
                resultCode = (textCode + keyCode) % 26;
                formula = `(${textCode} + ${keyCode}) mod 26 = ${resultCode}`;
            }
            
            const resultChar = String.fromCharCode(resultCode + 65);
            demo += `<div class="demo-line">${textChar} + ${keyChar}: ${formula} → ${resultChar}</div>`;
        }
        
        if (cleanText.length > 10) {
            demo += '<div class="demo-line"><em>... and so on for remaining characters</em></div>';
        }
        
        return demo;
    }
    
    function demonstrateKasiski() {
        const ciphertext = outputText.value;
        
        if (!ciphertext.trim() || ciphertext.length < 30) {
            showNotification('Please enter a longer text and encrypt it first for meaningful Kasiski analysis!', 'error');
            return;
        }
        
        const resultsDiv = document.getElementById('kasiski-results');
        if (!resultsDiv) {
            console.error('Kasiski results div not found');
            return;
        }
        
        resultsDiv.classList.remove('hidden');
        
        const analysis = kasiskiExamination(ciphertext);
        
        let resultsHTML = '<p><strong>Kasiski Examination Results:</strong></p>';
        
        if (analysis.repeatedSequences.length > 0) {
            resultsHTML += '<p><strong>Repeated Sequences Found:</strong></p>';
            analysis.repeatedSequences.forEach(seq => {
                resultsHTML += `<div class="brute-force-result">
                    <strong>${seq.sequence}:</strong> Found at positions ${seq.positions.join(', ')} 
                    (distances: ${seq.distances.join(', ')})
                </div>`;
            });
            
            if (analysis.possibleKeyLengths.length > 0) {
                resultsHTML += `<p><strong>Suggested Key Lengths:</strong> ${analysis.possibleKeyLengths.join(', ')}</p>`;
                resultsHTML += `<p><strong>Most Likely Key Length:</strong> ${analysis.suggestedKeyLength}</p>`;
            }
            
            // Calculate Index of Coincidence
            const ic = indexOfCoincidence(ciphertext);
            resultsHTML += `<p><strong>Index of Coincidence:</strong> ${ic.toFixed(4)} 
                (English ≈ 0.067, Random ≈ 0.038)</p>`;
        } else {
            resultsHTML += '<p>No repeated trigrams found. Text may be too short or use a very long key.</p>';
        }
        
        resultsDiv.innerHTML = resultsHTML;
        showNotification('Kasiski examination completed!', 'success');
    }
    
    // Initial processing
    processVigenereText();
}

/**
 * Setup code viewer functionality
 */
function setupCodeViewer() {
    const codeButtons = document.querySelectorAll('.code-btn');
    
    codeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const codeType = button.dataset.code;
            console.log('Code view clicked:', codeType); // Debug log
            
            // Update active button
            codeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Switch code view
            switchCodeView(codeType);
        });
    });
}

/**
 * Switch between different code views
 * @param {string} codeType - Type of code to display
 */
function switchCodeView(codeType) {
    console.log('Switching to code view:', codeType); // Debug log
    
    // Hide all code displays
    document.querySelectorAll('.code-display').forEach(display => {
        display.classList.remove('active');
        display.classList.add('hidden');
    });
    
    // Show selected code display
    const selectedDisplay = document.getElementById(`${codeType}-code`);
    if (selectedDisplay) {
        selectedDisplay.classList.add('active');
        selectedDisplay.classList.remove('hidden');
        console.log('Code view switched successfully'); // Debug log
    } else {
        console.error('Code display not found:', `${codeType}-code`);
    }
    
    AppState.currentCodeView = codeType;
}

/**
 * Setup copy to clipboard functionality
 */
function setupCopyButtons() {
    const copyC = document.getElementById('copy-caesar');
    const copyV = document.getElementById('copy-vigenere');
    
    if (copyC) {
        copyC.addEventListener('click', () => {
            const text = document.getElementById('caesar-output').value;
            copyToClipboard(text, 'Caesar result copied to clipboard!');
        });
    }
    
    if (copyV) {
        copyV.addEventListener('click', () => {
            const text = document.getElementById('vigenere-output').value;
            copyToClipboard(text, 'Vigenère result copied to clipboard!');
        });
    }
}

/**
 * Copy text to clipboard with user feedback
 * @param {string} text - Text to copy
 * @param {string} message - Success message to show
 */
function copyToClipboard(text, message) {
    if (!text.trim()) {
        showNotification('No text to copy!', 'error');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification(message, 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification(message, 'success');
    });
}

/**
 * Show user a notification message
 * @param {string} message - A Message to display
 * @param {string} type - It will show success, error, info (default: info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notify = document.createElement('div');
    notify.className = `notification notification--${type}`;
    notify.textContent = message;
    
    const bgColor = type === 'success' ? 'var(--color-success)' : 
                    type === 'error' ? 'var(--color-error)' : 
                    'var(--color-info)';
    
    notify.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: var(--space-12) var(--space-20);
        background: ${bgColor};
        color: var(--color-btn-primary-text);
        border-radius: var(--radius-base);
        z-index: 1000;
        font-weight: var(--font-weight-medium);
        box-shadow: var(--shadow-lg);
        max-width: 300px;
    `;
    
    document.body.appendChild(notify);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notify.parentNode) {
            notify.parentNode.removeChild(notify);
        }
    }, 3000);
}

/**
 * Setup analysis tools including frequency analysis
 */
function setupAnalysisTools() {
    const frequencyBtn = document.getElementById('frequency-analysis');
    if (frequencyBtn) {
        frequencyBtn.addEventListener('click', performFrequencyAnalysis);
    }
}

/**
 * Perform frequency analysis on current text
 */
function performFrequencyAnalysis() {
    // Get text from currently active cipher
    let text = '';
    
    // Try to get text from Caesar cipher first
    const cInput = document.getElementById('caesar-input');
    const cOutput = document.getElementById('caesar-output');
    if (cInput?.value?.trim()) {
        text = cInput.value;
    } else if (cOutput?.value?.trim()) {
        text = cOutput.value;
    }
    
    // If no Caesar text, try Vigenère
    if (!text) {
        const vInput = document.getElementById('vigenere-input');
        const vOutput = document.getElementById('vigenere-output');
        if (vInput?.value?.trim()) {
            text = vInput.value;
        } else if (vOutput?.value?.trim()) {
            text = vOutput.value;
        }
    }
    
    if (!text.trim()) {
        showNotification('Please enter some text in the cipher tabs first!', 'error');
        return;
    }
    
    const analysis = frequencyAnalysis(text);
    updateFrequencyChart(analysis);
}

/**
 * Initialize frequency analysis chart
 */
function initializeFrequencyChart() {
    const ctx = document.getElementById('frequency-chart');
    
    if (!ctx) {
        console.error('Frequency chart canvas not found');
        return;
    }
    
    if (AppState.frequencyChart) {
        AppState.frequencyChart.destroy();
    }
    
    try {
        AppState.frequencyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Text Frequency (%)',
                    data: [],
                    backgroundColor: '#1FB8CD',
                    borderColor: '#1FB8CD',
                    borderWidth: 1
                }, {
                    label: 'Expected English (%)',
                    data: [],
                    backgroundColor: '#FFC185',
                    borderColor: '#FFC185',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 15,
                        title: {
                            display: true,
                            text: 'Frequency (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Letters'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Letter Frequency Analysis'
                    },
                    legend: {
                        display: true
                    }
                }
            }
        });
        console.log('Frequency chart initialized successfully');
    } catch (error) {
        console.error('Error initializing frequency chart:', error);
    }
}

/**
 * Update frequency chart with analysis data
 * @param {Object} analysis - Frequency analysis results
 */
function updateFrequencyChart(analysis) {
    if (!AppState.frequencyChart) {
        console.log('Chart not initialized, initializing now...');
        initializeFrequencyChart();
        if (!AppState.frequencyChart) {
            console.error('Failed to initialize chart');
            return;
        }
    }
    
    try {
        // Prepare data for all 26 letters
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const textFrequencies = [];
        const englishFrequencies = [];
        
        letters.forEach(letter => {
            const textData = analysis.data.find(d => d.letter === letter);
            textFrequencies.push(textData ? parseFloat(textData.frequency) : 0);
            englishFrequencies.push(ENGLISH_FREQUENCIES[letter] || 0);
        });
        
        // Update chart
        AppState.frequencyChart.data.labels = letters;
        AppState.frequencyChart.data.datasets[0].data = textFrequencies;
        AppState.frequencyChart.data.datasets[1].data = englishFrequencies;
        AppState.frequencyChart.update();
        
        showNotification(`Analyzed ${analysis.totalLetters} letters`, 'success');
    } catch (error) {
        console.error('Error updating frequency chart:', error);
        showNotification('Error updating frequency chart', 'error');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

// Export functions for potential external use or testing
window.CryptographySuite = {
    caesarCipher,
    vigenereCipher,
    bruteForceCaesar,
    frequencyAnalysis,
    kasiskiExamination,
    indexOfCoincidence
};           