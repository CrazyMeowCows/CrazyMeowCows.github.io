//
//  ViewController.swift
//  WebTest1
//
//  Created by Tommy R on 12/27/24.
//

import UIKit
import WebKit

//class ViewController: UIViewController {
//    
////    let webView = WKWebView()
//    lazy var webView: WKWebView = {
//        let configuration = WKWebViewConfiguration()
//        let source: String = "var meta = document.createElement('meta');" +
//            "meta.name = 'viewport';" +
//            "meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';" +
//            "var head = document.getElementsByTagName('head')[0];" +
//            "head.appendChild(meta);"
//        let script: WKUserScript = WKUserScript(source: source, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
//        configuration.userContentController.addUserScript(script)
//        let webView = WKWebView(frame: .zero, configuration: configuration)
////        webView.navigationDelegate = self
//        return webView
//    }()
//
//    override func viewDidLoad() {
//        super.viewDidLoad()
//        view.addSubview(webView)
//        
//        guard let url = URL(string: "https://crazymeowcows.github.io") else {
//            return
//        }
//        webView.load(URLRequest(url: url))
//    }
//
//    override func viewDidLayoutSubviews() {
//        super.viewDidLayoutSubviews()
//        webView.frame = view.bounds
//    }
//
//}

class ViewController: UIViewController, WKUIDelegate {
    
    var webView: WKWebView!
    
    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        let source: String =
            "var meta = document.createElement('meta');" +
            "meta.name = 'viewport';" +
            "meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';" +
            "var head = document.getElementsByTagName('head')[0];" +
            "head.appendChild(meta);"
        let script: WKUserScript = WKUserScript(source: source, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        webConfiguration.userContentController.addUserScript(script)
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self
        view = webView
    }


    override func viewDidLoad() {
        super.viewDidLoad()
        
        let myURL = URL(string:"https://crazymeowcows.github.io")
        let myRequest = URLRequest(url: myURL!, cachePolicy: .reloadIgnoringLocalCacheData)
        webView.load(myRequest)
    }
}
