"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, easeInOut } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: easeInOut },
  viewport: { once: true, amount: 0.2 },
};

const slideInFromLeft = {
  initial: { opacity: 0, x: -100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: easeInOut },
  viewport: { once: true, amount: 0.3 },
};

const slideInFromRight = {
  initial: { opacity: 0, x: 100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: easeInOut },
  viewport: { once: true, amount: 0.3 },
};

const slideInFromBottom = {
  initial: { opacity: 0, y: 100 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: easeInOut },
  viewport: { once: true, amount: 0.3 },
};

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thanks for reaching out! I\'ll get back to you soon.'
        });
        e.currentTarget.reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Coding background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1500&q=80"
          alt="Person coding at night"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      {/* Animated elements overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-gray-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-blue-300 rounded-full animate-bounce opacity-50"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/10 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-white text-lg font-medium">
              THARUN P
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Hi, I'm <span className="text-blue-400">THARUN</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              Computer Science & Business Engineering Student
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              I'm currently studying Computer Science and Business Systems, passionate about building 
              scalable mobile apps using Flutter. I'm enhancing my DSA skills in C++ and aspiring to 
              become a Software Engineer at a top product-based company.
            </p>
          </div>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link href="#projects">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                See My Work
              </button>
            </Link>
            <a 
              href="/THARUN_RESUME.DOC" 
              download
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block text-center"
            >
              📄 Download Resume
            </a>
            <Link href="#contact">
              <button className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <motion.section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-black/10" {...slideInFromBottom}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12" {...slideInFromLeft}>
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6" {...slideInFromLeft}>
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a Computer Science and Business Engineering student from Chennai, passionate about building 
                scalable mobile apps using Flutter. I got into programming because I love solving problems 
                and building things that people can actually use.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                My journey started with C++ for DSA, then I moved to Python for data science and automation, 
                and now I'm building mobile apps with Flutter and learning Next.js for web development. 
                I spend a lot of time on LeetCode trying to improve my problem-solving skills.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I recently built a Club Management App for my college that handles 16 different clubs. 
                It was challenging but really fun to work on something that students actually use every day. 
                I'm eager to collaborate on software development projects and real-world solutions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-600/20 border border-blue-600 px-4 py-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-blue-400">CS&BS</div>
                  <div className="text-gray-300 text-sm">Student</div>
                </div>
                <div className="bg-blue-600/20 border border-blue-600 px-4 py-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-blue-400">100+</div>
                  <div className="text-gray-300 text-sm">LeetCode Problems</div>
                </div>
              </div>
            </motion.div>
            <motion.div className="bg-gradient-to-br from-blue-600 to-gray-700 p-1 rounded-lg" {...slideInFromRight}>
              <div className="bg-slate-900 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">What I'm working on</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Improving DSA skills on LeetCode
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Building more Flutter apps
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Learning Next.js and web development
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Exploring Data Science with Python
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Contributing to open source
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Preparing for product-based companies
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section id="skills" className="py-16 px-4 sm:px-6 lg:px-8" {...slideInFromBottom}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12" {...slideInFromLeft}>
            Skills & Technologies
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Languages I Use",
                skills: [
                  { name: "C++", level: 85, note: "For DSA and competitive programming" },
                  { name: "Python", level: 80, note: "Data Science & automation" },
                  { name: "Java", level: 75, note: "Object-oriented programming" },
                  { name: "Dart", level: 75, note: "Flutter development" },
                  { name: "C", level: 70, note: "System programming basics" },
                  { name: "SQL", level: 70, note: "Database queries" }
                ]
              },
              {
                title: "Tools & Frameworks",
                skills: [
                  { name: "Flutter", level: 80, note: "Mobile app development" },
                  { name: "Next.js", level: 40, note: "Web development framework" },
                  { name: "Firebase", level: 75, note: "database" },
                  { name: "MongoDB", level: 60, note: "database" },
                  { name: "Node.js & Express", level: 60, note: "Backend development" },
                  { name: "Git & GitHub", level: 85, note: "Version control" }
                ]
              },
              {
                title: "What I'm Learning",
                skills: [
                  { name: "DSA", level: 85, note: "Data structures & algorithms" },
                  { name: "Data Science", level: 70, note: "Python data analysis" },
                  { name: "OOP", level: 80, note: "Object-oriented programming" },
                  { name: "Problem Solving", level: 80, note: "Competitive programming" }
                ]
              }
            ].map((category, categoryIndex) => {
              let animationProps;
              if (categoryIndex === 0) {
                animationProps = slideInFromLeft;
              } else if (categoryIndex === 1) {
                animationProps = slideInFromBottom;
              } else {
                animationProps = slideInFromRight;
              }
              
              return (
                <motion.div 
                  key={categoryIndex} 
                  className="bg-black/20 border border-gray-700 rounded-lg p-6"
                  {...animationProps}
                >
                  <h3 className="text-xl font-semibold text-white mb-6 text-center">{category.title}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-blue-400 text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                            style={{width: `${skill.level}%`}}
                          ></div>
                        </div>
                        <p className="text-gray-400 text-xs">{skill.note}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-black/10" {...fadeInUp}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Projects I've Built</h2>
          <div className="grid md:grid-cols-1 gap-8">
            <div className="bg-black/20 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-600 transition-colors">
              <div className="h-40 bg-gradient-to-br from-blue-600 to-gray-700 flex items-center justify-center">
                <div className="text-4xl">🏛️</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">RIT Club Management App</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  A comprehensive Flutter app for managing 16 college clubs with real-time attendance tracking, OD management, and event coordination. Built with Firebase backend and features automated restriction systems.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/30">Flutter</span>
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/30">Firebase</span>
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/30">Real-time</span>
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/30">College App</span>
                </div>
                <ul className="text-gray-400 text-xs space-y-1 mb-4">
                  <li className="flex items-center"><span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>16 clubs supported</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>Attendance tracking</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>OD management</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>Real-time updates</li>
                </ul>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/THARUN-BART/RIT-Club.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-4 py-2 rounded text-sm transition-colors inline-block"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-8">
            I'm currently focused on building my skills in DSA and Data Science, and I look forward to adding projects in these areas soon!
          </p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section id="contact" className="py-16 px-4 sm:px-6 lg:px-8" {...fadeInUp}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Let's Connect</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Get in touch</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  I'm always interested in hearing about new opportunities, interesting projects, 
                  or just chatting about technology. Feel free to reach out!
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: "📧", label: "Email", value: "tharunpoogavanam@gmail.com" },
                  { icon: "📍", label: "Location", value: "Chennai, Tamil Nadu, India" },
                  { icon: "📱", label: "Phone", value: "+91-8778893660" },
                  { icon: "📄", label: "Resume", value: "THARUN_RESUME.DOC", link: "/THARUN_RESUME.DOC" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white">{contact.icon}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{contact.label}</p>
                      {contact.link ? (
                        <a 
                          href={contact.link} 
                          download 
                          className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-gray-300">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 resize-none"
                    placeholder="What's on your mind?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 rounded font-medium transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus && (
                  <div className={`text-center p-3 rounded ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-600/20 border border-green-600 text-green-400' 
                      : 'bg-red-600/20 border border-red-600 text-red-400'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="text-xl font-bold text-white mb-2">THARUN P</div>
              <p className="text-gray-400">Building things with code, one project at a time</p>
            </div>
            <div className="flex justify-center space-x-6 mb-6">
              {[
                { name: 'GitHub', icon: '🐙', url: 'github.com/THARUN-BART' },
                { name: 'LinkedIn', icon: '💼', url: 'linkedin.com/in/tharunbart8' },
                { name: 'LeetCode', icon: '🧮', url: 'leetcode.com/u/THARUN29112006/' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={`https://${social.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex flex-col items-center gap-1"
                >
                  <span className="text-lg">{social.icon}</span>
                  <span className="text-sm">{social.name}</span>
                </a>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400">
                © 2025 THARUN P. Made with ❤️ in Chennai
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}