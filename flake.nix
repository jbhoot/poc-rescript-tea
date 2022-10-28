{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs }:
  let
    supportedSystems = [ "x86_64-linux" "aarch64-darwin" "x86_64-darwin" ];
    createDevShell = system:
    let
      pkgs = import nixpkgs { inherit system; };
    in
    pkgs.mkShell {
      buildInputs = [
        pkgs.nodejs
      ];
    };
  in
  {
    devShell = nixpkgs.lib.genAttrs supportedSystems createDevShell;
  };
}
