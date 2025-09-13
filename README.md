# 🔐 Classical Cryptography Suite

<div align="center">

![Classical Cryptography Suite](./assets/favicon.png)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg?style=for-the-badge)
![Language](https://img.shields.io/badge/language-JavaScript-yellow.svg?style=for-the-badge)

**Advanced encryption and decryption tools with educational content for beginners and experts**

[🚀 Live Demo](https://hnikhil-dev.github.io/classical-cryptography-suite) • [📖 Documentation](#documentation) • [🤝 Contributing](#contributing) • [📝 License](#license)

</div>

---

## 🎯 Overview

The **Classical Cryptography Suite** is an educational web application that brings the fascinating world of classical cryptography to your fingertips. Built with modern web technologies, it provides interactive implementations of Caesar and Vigenère ciphers along with powerful cryptanalysis tools.

<div align="center">

```ascii
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║    🔒 ENCRYPT    ➜    🔓 DECRYPT    ➜    🔍 ANALYZE        ║
║                                                               ║
║       Caesar Cipher  •  Vigenère Cipher  •  Frequency         ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎛️ **Interactive Ciphers**
- **Caesar Cipher** with real-time shift adjustment (1-25)
- **Vigenère Cipher** with dynamic key visualization  
- Live encryption/decryption as you type
- Visual step-by-step demonstrations
- Formula explanations with examples

### 🔍 **Advanced Cryptanalysis**
- Frequency analysis with interactive charts
- Brute force attack simulation for Caesar
- Kasiski examination for Vigenère cipher
- Index of Coincidence calculation
- Attack method demonstrations

</td>
<td width="50%">

### 🎨 **Modern Interface**
- Responsive design for all devices
- Dark/light theme support (automatic detection)
- Clean, professional UI with smooth animations
- Copy-to-clipboard functionality
- Real-time processing and feedback

### 📚 **Educational Content**
- Mathematical formulas and explanations
- Security vulnerability demonstrations
- Well-commented source code viewer
- Step-by-step cryptanalysis guides
- Interactive learning experience

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hnikhil-dev/classical-cryptography-suite.git
   cd classical-cryptography-suite
   ```

2. **Launch the application**
   ```bash
   # Using Python's built-in server
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   
   # Or simply open index.html in your browser
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

---

## 🎮 Usage Guide

### Caesar Cipher
```javascript
// Encrypt text with shift of 3
caesarCipher("Hello World", 3, false)  // Returns: "Khoor Zruog"

// Decrypt the same text
caesarCipher("Khoor Zruog", 3, true)   // Returns: "Hello World"
```

### Vigenère Cipher
```javascript
// Encrypt with key "SECRET"
vigenereCipher("Hello World", "SECRET", false)  // Returns: "Zincs Otvjb"

// Decrypt with the same key
vigenereCipher("Zincs Otvjb", "SECRET", true)   // Returns: "Hello World"
```

### Security Analysis
```javascript
// Perform frequency analysis
const analysis = frequencyAnalysis("Your encrypted text here");

// Brute force Caesar cipher (tries all 25 possible keys)
const results = bruteForceCaesar("Khoor Zruog");

// Kasiski examination for Vigenère key length detection
const kasiski = kasiskiExamination("Your Vigenère ciphertext");
```

---

## 🏗️ Project Structure

```
classical-cryptography-suite/
├── 📄 index.html          # Main HTML structure and UI
├── 🎨 style.css           # Comprehensive styling with CSS variables
├── ⚡ app.js              # Core JavaScript logic and algorithms
├── 📁 assets/             # Project assets
│   └── 🖼️ favicon.png     # Application favicon
├── 📖 README.md           # Project documentation
├── 📝 LICENSE             # MIT License
└── 🧪 .gitignore          # Git ignore rules
```

---

## 🔬 Technical Implementation

### Core Algorithms

#### Caesar Cipher
- **Time Complexity**: O(n) where n is text length
- **Key Space**: 25 possible keys (very insecure!)
- **Formula**: E(x) = (x + n) mod 26

#### Vigenère Cipher
- **Time Complexity**: O(n) where n is text length
- **Key Space**: 26^m where m is key length
- **Formula**: E(i) = (P(i) + K(i mod m)) mod 26

### Cryptanalysis Methods

#### Frequency Analysis
Analyzes letter frequency distribution to identify patterns in encrypted text.

#### Brute Force Attack
- **Caesar**: Tests all 25 possible shifts
- **Effectiveness**: 100% success rate
- **Time**: Instant for Caesar cipher

#### Kasiski Examination
- Finds repeated trigrams in Vigenère ciphertext
- Calculates distances between repetitions
- Estimates key length using GCD analysis

#### Index of Coincidence
- Statistical measure: IC = Σ(ni(ni-1)) / (N(N-1))
- English text ≈ 0.067, Random text ≈ 0.038
- Helps determine if polyalphabetic cipher was used

---

## 🎨 Features Showcase

### Interactive Demonstrations
- **Real-time processing** as you type
- **Visual feedback** with color-coded results
- **Step-by-step explanations** of algorithms
- **Attack simulations** showing cipher weaknesses

### Modern UI/UX
- **Responsive design** works on all devices
- **Dark/Light themes** with automatic detection
- **Smooth animations** and transitions
- **Professional styling** with CSS custom properties

### Educational Value
- **Mathematical formulas** clearly explained
- **Security analysis** of each cipher
- **Interactive learning** through hands-on experience
- **Source code** available for study

---

## 🧪 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Fully Supported |
| Firefox | 88+     | ✅ Fully Supported |
| Safari  | 14+     | ✅ Fully Supported |
| Edge    | 90+     | ✅ Fully Supported |

---

## 📊 Security Analysis

### Vulnerability Comparison

| Algorithm | Key Space | Security Level | Main Vulnerabilities |
|-----------|-----------|----------------|---------------------|
| Caesar    | 25        | Very Low       | Brute Force, Frequency Analysis |
| Vigenère  | 26^m      | Low-Medium     | Kasiski, Index of Coincidence |

### Attack Methods

#### 🔨 Brute Force Attack
- **Effectiveness**: 100% against Caesar (only 25 keys to try)
- **Time Complexity**: O(k×n) where k is key space, n is text length
- **Defense**: Use longer keys and stronger algorithms

#### 📊 Frequency Analysis
- **Target**: Single substitution patterns
- **Method**: Compare letter frequencies to English language statistics
- **Most Common English Letters**: E(12.7%), T(9.1%), A(8.2%), O(7.5%)

#### 🔍 Kasiski Examination
- **Purpose**: Determine Vigenère key length
- **Method**: Find repeated sequences and calculate distances
- **Success Rate**: High for keys shorter than text length

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute
- 🐛 **Bug Reports**: Found an issue? Please report it!
- ✨ **Feature Requests**: Suggest new ciphers or analysis tools
- 📚 **Documentation**: Improve explanations or add examples
- 🎨 **UI/UX**: Enhance the user interface or experience
- 🧪 **Testing**: Help test on different browsers and devices

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with clear, commented code
4. Test thoroughly across different browsers
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📚 Educational Resources

### Learning Objectives
- Understand classical cryptography principles
- Learn about cipher vulnerabilities and attacks
- Gain hands-on experience with cryptanalysis
- Explore the evolution of encryption methods

### Recommended Next Steps
1. Study modern cryptographic algorithms (AES, RSA)
2. Learn about cryptographic hash functions
3. Explore digital signatures and PKI
4. Understand cryptographic protocols (TLS/SSL)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Nikhil Dabhade

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👨‍💻 About the Developer

<div align="center">

**Nikhil Dabhade**  
*Cybersecurity Enthusiast & Web Developer*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nikhil-dabhade-602a86286/)
[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/NikhilDabhade17)
[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hnikhil-dev)

*This project was created as an educational tool to help students and enthusiasts learn about classical cryptography interactively.*

</div>

---

## 🔗 Links

- **Live Demo**: [https://hnikhil-dev.github.io/classical-cryptography-suite](https://hnikhil-dev.github.io/classical-cryptography-suite)
- **Source Code**: [https://github.com/hnikhil-dev/classical-cryptography-suite](https://github.com/hnikhil-dev/classical-cryptography-suite)
- **Developer Profile**: [https://github.com/hnikhil-dev](https://github.com/hnikhil-dev)

---

<div align="center">

**Educational Purpose Notice**  
*This tool is designed for educational purposes only. Classical ciphers shown here are not secure for real-world encryption needs. Use modern cryptographic algorithms for actual security requirements.*

**Made with ❤️ for the cybersecurity learning community**

[🔝 Back to Top](#-classical-cryptography-suite)

</div>
