import Zone from "./Zone";

// ==== Mapping svg plan and the real Zone names
// 

export type zone = {
  id: number;
  zone: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const zones: zone[] = [
  {id:1, zone:"L01", x:216, y:890, w:208, h:10},
  {id:2, zone:"L06", x:414, y:741, w:10, h:39},
  {id:3, zone:"L10", x:414, y:504, w:10, h:185},
  {id:4, zone:"L14", x:414, y:415, w:10, h:82},
  {id:5, zone:"L16", x:327, y:412, w:82, h:10},
  {id:6, zone:"", x:376, y:440, w:7, h:27},
  {id:7, zone:"", x:376, y:489, w:7, h:27},
  {id:8, zone:"L12", x:376, y:537, w:7, h:27},
  {id:9, zone:"L11", x:376, y:583, w:7, h:27},
  {id:10, zone:"L09", x:376, y:631, w:7, h:27},
  {id:11, zone:"L05", x:376, y:682, w:7, h:27},
  {id:12, zone:"L04", x:325, y:736, w:7, h:27},
  {id:13, zone:"L03", x:325, y:790, w:7, h:27},
  {id:14, zone:"L02", x:325, y:842, w:7, h:27},
  {id:15, zone:"L02", x:221, y:859, w:102, h:10},
  {id:16, zone:"L02", x:221, y:842, w:102, h:10},
  {id:17, zone:"L03", x:272, y:807, w:51, h:10},
  {id:18, zone:"L03", x:221, y:807, w:49, h:10},
  {id:19, zone:"L03", x:221, y:790, w:102, h:10},
  {id:20, zone:"L04", x:221, y:753, w:102, h:10},
  {id:21, zone:"L04", x:221, y:736, w:102, h:10},
  {id:22, zone:"L05", x:302, y:699, w:72, h:10},
  {id:23, zone:"L05", x:302, y:682, w:72, h:10},
  {id:24, zone:"L05", x:231, y:699, w:67, h:10},
  {id:25, zone:"L05", x:231, y:682, w:67, h:10},
  {id:26, zone:"L07", x:239, y:648, w:135, h:10},
  {id:27, zone:"L09", x:231, y:631, w:143, h:10},
  {id:28, zone:"L11", x:333, y:600, w:41, h:10},
  {id:29, zone:"L11", x:231, y:600, w:100, h:10},
  {id:30, zone:"L11", x:231, y:583, w:143, h:10},
  {id:31, zone:"L12", x:231, y:554, w:143, h:10},
  {id:32, zone:"L12", x:231, y:537, w:143, h:10},
  {id:33, zone:"L13", x:231, y:506, w:143, h:10},
  {id:34, zone:"L13", x:351, y:489, w:23, h:10},
  {id:35, zone:"L13", x:231, y:489, w:118, h:10},
  {id:36, zone:"L15", x:231, y:457, w:143, h:10},
  {id:37, zone:"L15", x:302, y:440, w:72, h:10},
  {id:38, zone:"L15", x:231, y:440, w:69, h:10},
  {id:39, zone:"L16", x:231, y:412, w:94, h:10},
  {id:40, zone:"L15", x:222, y:440, w:7, h:27},
  {id:41, zone:"L13", x:222, y:489, w:7, h:27},
  {id:42, zone:"L12", x:222, y:537, w:7, h:27},
  {id:43, zone:"L11", x:222, y:583, w:7, h:27},
  {id:44, zone:"L08", x:222, y:631, w:7, h:20},
  {id:45, zone:"L05", x:222, y:682, w:7, h:27},
  {id:46, zone:"L04", x:212, y:736, w:7, h:27},
  {id:47, zone:"L03", x:212, y:790, w:7, h:27},
  {id:48, zone:"L02", x:212, y:842, w:7, h:27},
  {id:49, zone:"L35", x:136, y:871, w:27, h:7},
  {id:50, zone:"L35", x:153, y:829, w:10, h:40},
  {id:51, zone:"L35", x:136, y:829, w:10, h:40},
  {id:52, zone:"L35", x:136, y:783, w:10, h:44},
  {id:53, zone:"L35", x:153, y:783, w:10, h:44},
  {id:54, zone:"L35", x:136, y:774, w:27, h:7},
  {id:55, zone:"L28", x:136, y:658, w:27, h:7},
  {id:56, zone:"L28", x:153, y:626, w:10, h:30},
  {id:57, zone:"L28", x:136, y:626, w:10, h:30},
  {id:58, zone:"L28", x:153, y:585, w:10, h:39},
  {id:59, zone:"L28", x:136, y:585, w:10, h:39},
  {id:60, zone:"L28", x:136, y:576, w:27, h:7},
  {id:61, zone:"L26", x:163, y:537, w:7, h:27},
  {id:62, zone:"L22", x:163, y:489, w:7, h:27},
  {id:63, zone:"L19", x:163, y:440, w:7, h:27},
  {id:64, zone:"L17", x:134, y:412, w:39, h:10},
  {id:65, zone:"L17", x:18, y:412, w:112, h:10},
  {id:66, zone:"L19", x:60, y:440, w:101, h:10},
  {id:67, zone:"L20", x:60, y:457, w:101, h:10},
  {id:68, zone:"L21", x:60, y:489, w:101, h:10},
  {id:69, zone:"L23", x:60, y:506, w:101, h:10},
  {id:70, zone:"L25", x:60, y:537, w:68, h:10},
  {id:71, zone:"L25", x:129, y:537, w:33, h:10},
  {id:72, zone:"L27", x:60, y:554, w:50, h:10},
  {id:73, zone:"L27", x:111, y:554, w:51, h:10},
  {id:74, zone:"L29", x:56, y:576, w:27, h:7},
  {id:75, zone:"L29", x:73, y:585, w:10, h:25},
  {id:76, zone:"L29", x:56, y:585, w:10, h:44},
  {id:77, zone:"L29", x:56, y:630, w:10, h:27},
  {id:78, zone:"L29", x:73, y:611, w:10, h:46},
  {id:79, zone:"L29", x:56, y:658, w:27, h:7},
  {id:80, zone:"L32", x:56, y:684, w:27, h:7},
  {id:81, zone:"L32", x:56, y:693, w:10, h:42},
  {id:82, zone:"L34", x:52, y:774, w:27, h:7},
  {id:83, zone:"L34", x:69, y:783, w:10, h:87},
  {id:84, zone:"L34", x:52, y:783, w:10, h:26},
  {id:85, zone:"L34", x:52, y:810, w:10, h:60},
  {id:86, zone:"L34", x:52, y:871, w:27, h:7},
  {id:87, zone:"L33", x:8, y:795, w:10, h:107},
  {id:88, zone:"L31", x:8, y:695, w:10, h:54},
  {id:89, zone:"L30", x:8, y:621, w:10, h:42},
  {id:90, zone:"L24", x:8, y:533, w:10, h:71},
  {id:91, zone:"L18", x:8, y:425, w:10, h:70},
  {id:101, zone:"M42", x:527, y:890, w:88, h:10},
  {id:102, zone:"M42", x:438, y:890, w:82, h:10},
  {id:103, zone:"M41", x:438, y:741, w:10, h:145},
  {id:104, zone:"M40", x:438, y:405, w:17, h:285},
  {id:105, zone:"C01", x:598, y:316, w:17, h:349},
  {id:106, zone:"", x:426, y:357, w:7, h:27},
  {id:107, zone:"", x:426, y:319, w:7, h:27},
  {id:108, zone:"M32", x:426, y:281, w:7, h:27},
  {id:109, zone:"M31", x:426, y:243, w:7, h:27},
  {id:110, zone:"", x:426, y:205, w:7, h:27},
  {id:111, zone:"", x:426, y:167, w:7, h:27},
  {id:112, zone:"", x:426, y:129, w:7, h:27},
  {id:113, zone:"M21", x:198, y:12, w:220, h:18},
  {id:114, zone:"M20", x:134, y:11, w:55, h:32},
  {id:115, zone:"M24", x:294, y:129, w:130, h:10},
  {id:116, zone:"M25", x:294, y:146, w:130, h:10},
  {id:117, zone:"M26", x:294, y:167, w:130, h:10},
  {id:118, zone:"M27", x:294, y:184, w:130, h:10},
  {id:119, zone:"M28", x:294, y:205, w:130, h:10},
  {id:120, zone:"M29", x:294, y:222, w:130, h:10},
  {id:121, zone:"M30", x:294, y:243, w:130, h:10},
  {id:122, zone:"M31", x:294, y:260, w:130, h:10},
  {id:123, zone:"M32", x:294, y:281, w:130, h:10},
  {id:124, zone:"M33", x:294, y:298, w:130, h:10},
  {id:125, zone:"M34", x:294, y:319, w:107, h:10},
  {id:126, zone:"M34", x:403, y:319, w:21, h:10},
  {id:127, zone:"M35", x:294, y:336, w:107, h:10},
  {id:128, zone:"M35", x:403, y:336, w:21, h:10},
  {id:129, zone:"M36", x:294, y:357, w:130, h:10},
  {id:130, zone:"M37", x:294, y:374, w:52, h:10},
  {id:131, zone:"M37", x:348, y:374, w:42, h:10},
  {id:132, zone:"M37", x:392, y:374, w:32, h:10},
  {id:133, zone:"M39", x:294, y:392, w:130, h:10},
  {id:134, zone:"", x:178, y:362, w:7, h:24},
  {id:135, zone:"", x:178, y:324, w:7, h:27},
  {id:136, zone:"", x:178, y:285, w:7, h:27},
  {id:137, zone:"", x:178, y:246, w:7, h:27},
  {id:138, zone:"", x:178, y:207, w:7, h:27},
  {id:139, zone:"", x:178, y:168, w:7, h:27},
  {id:140, zone:"", x:178, y:129, w:7, h:27},
  {id:141, zone:"M18", x:154, y:129, w:22, h:10},
  {id:142, zone:"M18", x:128, y:129, w:24, h:10},
  {id:143, zone:"M18", x:102, y:129, w:24, h:10},
  {id:144, zone:"M18", x:78, y:129, w:22, h:10},
  {id:145, zone:"M18", x:46, y:129, w:30, h:10},
  {id:146, zone:"M17", x:46, y:146, w:130, h:10},
  {id:147, zone:"M16", x:46, y:168, w:130, h:10},
  {id:148, zone:"M15", x:46, y:185, w:130, h:10},
  {id:149, zone:"M14", x:46, y:207, w:130, h:10},
  {id:150, zone:"M12", x:46, y:224, w:130, h:10},
  {id:151, zone:"M11", x:46, y:246, w:130, h:10},
  {id:152, zone:"M10", x:46, y:263, w:130, h:10},
  {id:153, zone:"M09", x:46, y:285, w:130, h:10},
  {id:154, zone:"M08", x:87, y:302, w:89, h:10},
  {id:155, zone:"M08", x:46, y:302, w:38, h:10},
  {id:156, zone:"M07", x:46, y:324, w:130, h:10},
  {id:157, zone:"M05", x:46, y:341, w:130, h:10},
  {id:158, zone:"M04", x:46, y:363, w:130, h:10},
  {id:159, zone:"M02", x:136, y:379, w:40, h:7},
  {id:160, zone:"M01", x:136, y:396, w:40, h:7},
  {id:161, zone:"M01", x:93, y:396, w:41, h:7},
  {id:162, zone:"M02", x:93, y:379, w:41, h:7},
  {id:163, zone:"M01", x:47, y:396, w:44, h:7},
  {id:164, zone:"M02", x:47, y:379, w:44, h:7},
  {id:165, zone:"M03", x:8, y:365, w:10, h:38},
  {id:166, zone:"M06", x:8, y:312, w:10, h:48},
  {id:167, zone:"M06", x:8, y:151, w:10, h:112},
  {id:168, zone:"M13", x:8, y:68, w:10, h:58},
  {id:169, zone:"M22", x:430, y:11, w:51, h:56},
  {id:170, zone:"M23", x:519, y:11, w:92, h:56},
];


type MainPlanProps = {
    selectedZones: number[];
}

export default function MainPlan(props: MainPlanProps){
    return(
        <div className="h-full flex">
        <svg className="h-full" viewBox="0 0 626 909" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <g clipPath="url(#clip0_12_20)">
                <line className="stroke-blue-dark" x1="431" y1="909" x2="431" y2="738" stroke-width="6"/>
                <line x1="431" y1="909" x2="431" y2="738" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="3" y1="904" x2="3" y2="793" className="stroke-blue-dark" stroke-width="6"/>
                <line x1="3" y1="904" x2="3" y2="793" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <path d="M3 751L3 531" className="stroke-blue-dark" stroke-width="6"/>
                <path d="M3 751L3 531" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="623" y1="909" x2="623" y2="788" className="stroke-blue-dark" stroke-width="6"/>
                <line x1="623" y1="909" x2="623" y2="788" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <path d="M431 691V410" className="stroke-blue-dark" stroke-width="6"/>
                <path d="M431 691V410" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="221" y1="407" x2="434" y2="407" className="stroke-blue-dark" stroke-width="6"/>
                <line x1="221" y1="407" x2="434" y2="407" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="6" y1="407" x2="176" y2="407" className="stroke-blue-dark" stroke-width="6"/>
                <line x1="6" y1="407" x2="176" y2="407" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="622" y1="171.983" x2="623" y2="-0.0174444" className="stroke-blue-dark" stroke-width="6"/>
                <line x1="622" y1="171.983" x2="623" y2="-0.0174444" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="625" y1="3" x2="6" y2="2.99997" className="stroke-blue-dark" stroke-width="6"/>
                <line x1="625" y1="3" x2="6" y2="2.99997" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="622.75" y1="665.006" x2="622.052" y2="319.006" className="stroke-blue-dark" stroke-width="6"/>
                <line x1="622.75" y1="665.006" x2="622.052" y2="319.006" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="74" y1="907" x2="-1.24187e-09" y2="907" className="stroke-blue-dark" stroke-width="6"/>
                <line x1="74" y1="907" x2="-1.24187e-09" y2="907" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="434" y1="907" x2="139" y2="907" className="stroke-blue-dark" stroke-width="6"/>
                <line x1="434" y1="907" x2="139" y2="907" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="626" y1="907" x2="426" y2="907" className="stroke-blue-dark" stroke-width="6"/>
                <line x1="626" y1="907" x2="426" y2="907" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="3" y1="499" x2="3" className="stroke-blue-dark" stroke-width="6"/>
                <line x1="3" y1="499" x2="3" className="stroke-blue-dark" strokeOpacity="0.2" stroke-width="6"/>
                <line x1="65.5" y1="870" x2="65.5" y2="783" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="149.5" y1="869" x2="149.5" y2="782" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="69.5" y1="657" x2="69.5" y2="584" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="149.5" y1="657" x2="149.5" y2="584" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="60" y1="453.5" x2="161" y2="453.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="231.002" y1="453.5" x2="374.002" y2="453.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="46" y1="376.5" x2="176" y2="376.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="46" y1="337.5" x2="176" y2="337.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="46" y1="298.5" x2="176" y2="298.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="46" y1="259.5" x2="176" y2="259.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="46" y1="181.5" x2="176" y2="181.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="46" y1="142.5" x2="176" y2="142.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="46" y1="220.5" x2="176" y2="220.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="294" y1="370.5" x2="424" y2="370.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="294" y1="332.5" x2="424" y2="332.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="294" y1="294.5" x2="424" y2="294.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="294" y1="256.5" x2="424" y2="256.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="294" y1="180.5" x2="424" y2="180.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="294" y1="142.5" x2="424" y2="142.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="294" y1="218.5" x2="424" y2="218.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="231" y1="502.5" x2="374" y2="502.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="231" y1="550.5" x2="374" y2="550.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="231" y1="596.5" x2="374.004" y2="596.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="231" y1="644.5" x2="374.004" y2="644.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="231" y1="695.5" x2="374.004" y2="695.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="221" y1="855.5" x2="323" y2="855.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="221" y1="803.5" x2="323" y2="803.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="221" y1="749.5" x2="323" y2="749.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="60" y1="502.5" x2="161" y2="502.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="60" y1="550.5" x2="161" y2="550.5" className="stroke-blue-dark" stroke-width="3"/>
                <line x1="68.5" y1="739" x2="68.5" y2="692" stroke="#2B7FFF" stroke-width="3"/>
                <line x1="149.5" y1="739" x2="149.5" y2="692" stroke="#2B7FFF" stroke-width="3"/>
                <path d="M11.5 670.75C11.5 670.551 11.421 670.36 11.2803 670.22C11.1397 670.079 10.9489 670 10.75 670C10.5511 670 10.3603 670.079 10.2197 670.22C10.079 670.36 10 670.551 10 670.75C10 672.02 10.928 672.667 11.506 673.07L11.57 673.114C12.25 673.59 12.5 673.819 12.5 674.25C12.5 674.449 12.579 674.64 12.7197 674.78C12.8603 674.921 13.0511 675 13.25 675C13.4489 675 13.6397 674.921 13.7803 674.78C13.921 674.64 14 674.449 14 674.25C14 672.98 13.072 672.333 12.494 671.93L12.43 671.886C11.75 671.41 11.5 671.18 11.5 670.75ZM10.821 676C10.5818 676 10.345 676.047 10.124 676.138C9.90299 676.23 9.70219 676.364 9.53307 676.533C9.36395 676.702 9.22982 676.903 9.13835 677.124C9.04688 677.345 8.99987 677.582 9 677.821V682C8.99839 683.858 9.6434 685.658 10.8243 687.092C12.0053 688.526 13.6485 689.505 15.4721 689.86C17.2957 690.214 19.1859 689.924 20.8184 689.037C22.4509 688.15 23.7239 686.723 24.419 685H25.75C26.612 685 27.4386 684.658 28.0481 684.048C28.6576 683.439 29 682.612 29 681.75C29 680.888 28.6576 680.061 28.0481 679.452C27.4386 678.842 26.612 678.5 25.75 678.5H25V677.821C25.0001 677.582 24.9531 677.345 24.8617 677.124C24.7702 676.903 24.6361 676.702 24.4669 676.533C24.2978 676.364 24.097 676.23 23.876 676.138C23.655 676.047 23.4182 676 23.179 676H10.821ZM25.75 683.5H24.86C24.9537 683.006 25.0006 682.503 25 682V680H25.75C25.9798 680 26.2074 680.045 26.4197 680.133C26.632 680.221 26.8249 680.35 26.9874 680.513C27.1499 680.675 27.2788 680.868 27.3668 681.08C27.4547 681.293 27.5 681.52 27.5 681.75C27.5 681.98 27.4547 682.207 27.3668 682.42C27.2788 682.632 27.1499 682.825 26.9874 682.987C26.8249 683.15 26.632 683.279 26.4197 683.367C26.2074 683.455 25.9798 683.5 25.75 683.5ZM14.75 670C14.9489 670 15.1397 670.079 15.2803 670.22C15.421 670.36 15.5 670.551 15.5 670.75C15.5 671.181 15.75 671.41 16.43 671.886L16.494 671.93C17.072 672.333 18 672.98 18 674.25C18 674.449 17.921 674.64 17.7803 674.78C17.6397 674.921 17.4489 675 17.25 675C17.0511 675 16.8603 674.921 16.7197 674.78C16.579 674.64 16.5 674.449 16.5 674.25C16.5 673.819 16.25 673.59 15.57 673.114L15.506 673.07C14.928 672.667 14 672.02 14 670.75C14 670.551 14.079 670.36 14.2197 670.22C14.3603 670.079 14.5511 670 14.75 670ZM19.5 670.75C19.5 670.551 19.421 670.36 19.2803 670.22C19.1397 670.079 18.9489 670 18.75 670C18.5511 670 18.3603 670.079 18.2197 670.22C18.079 670.36 18 670.551 18 670.75C18 672.02 18.928 672.667 19.506 673.07L19.57 673.114C20.25 673.59 20.5 673.819 20.5 674.25C20.5 674.449 20.579 674.64 20.7197 674.78C20.8603 674.921 21.0511 675 21.25 675C21.4489 675 21.6397 674.921 21.7803 674.78C21.921 674.64 22 674.449 22 674.25C22 672.98 21.072 672.333 20.494 671.93L20.43 671.886C19.75 671.41 19.5 671.181 19.5 670.75Z" fill="#2B7FFF"/>
                <path d="M151 738.5L130.5 744.5L109 745.5L86.5 744.5L67 738.5" stroke="#2B7FFF" stroke-width="3"/>
                <line y1="-1.5" x2="9.24762" y2="-1.5" transform="matrix(1 0 0.0368892 0.999319 369 822)" stroke="#2B7FFF" stroke-width="3"/>
                <line y1="-1.5" x2="9.24762" y2="-1.5" transform="matrix(1 0 0.0368892 0.999319 369 879)" stroke="#2B7FFF" stroke-width="3"/>
                <line y1="-1.5" x2="60.14" y2="-1.5" transform="matrix(0 -1 0.999319 0.0368893 369 879.14)" stroke="#2B7FFF" stroke-width="3"/>
                <line x1="431" y1="691" x2="431" y2="715" className="stroke-blue-dark" stroke-width="2"/>
                <line x1="449.239" y1="722.732" x2="431.682" y2="739.094" className="stroke-blue-dark" stroke-width="2"/>
                <line x1="4.80356" y1="750.405" x2="24.8036" y2="777.405" className="stroke-blue-dark" stroke-width="2"/>
                <line x1="3.80418" y1="498.406" x2="20.8042" y2="521.406" className="stroke-blue-dark" stroke-width="2"/>
                <line x1="173" y1="407" x2="198" y2="407" className="stroke-blue-dark" stroke-width="2"/>
                <line x1="223.209" y1="408.611" x2="206.209" y2="386.611" className="stroke-blue-dark" stroke-width="2"/>
                <line x1="45" y1="904" x2="89" y2="904" className="stroke-blue-dark" stroke-width="2"/>
                <line x1="112" y1="904" x2="156" y2="904" className="stroke-blue-dark" stroke-width="2"/>
                <rect x="226" y="653" width="9" height="9" className="fill-blue-dark"/>
            </g>



            {zones.map(z=>(
                <Zone
                key={z.id}
                id={z.id}
                x={z.x}
                y={z.y}
                w={z.w}
                h={z.h}

                selected={props.selectedZones.includes(z.id)}
                ></Zone>
            ))}


            <defs>

                <clipPath id="clip0_12_20">
                <rect width="626" height="909" fill="white"/>
                </clipPath>
            </defs>
            
        </svg>


        {/* <Zone x={202} y={893} width={213} height={10} fill="#2B7FFF"></Zone> */}
        </div>
    )
}