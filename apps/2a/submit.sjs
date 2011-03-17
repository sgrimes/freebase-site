/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var req = acre.request;
var FB = acre.freebase;

function create_app(args) {
  var name = "New App";
  var group = FB.create_group("Owners of " + name + " app").result;

  var create_q = {
    create : 'unconditional',
    name : name,
    id : null,
    type: [
      {id: '/type/domain',
      connect: 'insert'},
      {id: '/common/topic',
      connect: 'insert'},
      {id: '/freebase/apps/application',
      connect: 'insert'}
    ],
    "/type/domain/owners" : {
      id : group.id,
      connect : "update"
    }
  };
  var res = FB.mqlwrite(create_q, {use_permission_of : group.id}).result;
  return res.id;
}

function set_app_properties(args) {
  if (!args.appid) { throw "Missing appid argument"; }
  var api = acre.require("lib/appeditor-services/set_app_properties");
  return api.set_app_properties(args.appid, args);
}

function add_icon(args) {
  if (!args.appid) { throw "Missing appid argument"; }
  
  var name = args.name || "";
  var url = FB.service_url + "/api/service/form_upload_image";
  var opts = {
    method : "POST",
    headers : {
      'content-type' : req.headers['content-type']
    },
    content : req.body,
    sign : true
  };
  
  var upload = acre.require("service/lib").handle_freebase_response(acre.urlfetch(url, opts)).result;
  //var upload = FB.fetch(url, opts).result;
  
  FB.mqlwrite({
    id: args.appid,
    "/freebase/apps/application/icon": {
      id : upload.id,
      connect : "update",
      name : {
        value : name,
        lang : "/lang/en",
        connect : "update"
      }
    }
  });

  return {
    id : upload.id,
    name : name
  };
}

function delete_icon(args) {
  if (!args.iconid) { throw "Missing iconid argument"; }

  return FB.mqlwrite({
    id: args.appid,
    "/freebase/apps/application/icon": {
      id : args.iconid,
      connect : "delete"
    }
    }).result;
  }